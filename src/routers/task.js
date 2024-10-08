const express = require('express')

const Task = require('../model/task')

const auth = require('../middleware/auth')

const router = new express.Router()

// router.post('/tasks', async (req, res) => {
//     const task = new Task(req.body)
    
//     try {
//         await task.save()
//         res.status(201).send(task)
//     } catch (error) {
//         res.status(400).send(error)
//     }
// })

router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})


// router.get('/tasks', async (req, res) => {
//     try {
//         const task = await Task.find({})
//         res.send(task)
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })

router.get('/tasks', auth, async (req, res) => {
    const match = {}
    const sort = {}
        if(req.query.completed)
        {
            match.completed = req.query.completed === 'true'
        }
        if(req.query.sortBy)
        {
            const parts = req.query.sortBy.split(":")
            sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
        }
    try {
        //const task = await Task.find({})
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        })
        res.send(req.user.tasks)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

// router.get('/tasks/:id', async (req, res) => {
//     const _id = req.params.id
//     if(_id.length !== 24)
//     {
//         return res.status(400).send("Id is invalid")
//     }
//     try {
//         const task = await Task.findById(_id)
//         if(!task)
//         {
//             return res.status(404).send("No task found")
//         }
//         res.send(task)
//     } catch (error) {
//         res.status(500)
//     }
// })

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    if(_id.length !== 24)
    {
        return res.status(400).send("Id is invalid")
    }
    try {
        const task = await Task.findOne({ _id, owner: req.user._id })
        if(!task)
        {
            return res.status(404).send("No task found")
        }
        res.send(task)
    } catch (error) {
        res.status(500)
    }
})

// router.patch('/tasks/:id', async (req, res) => {
//     const _id = req.params.id
//     const updates = Object.keys(req.body)
//     const isAllowedToUpdate = ["description", "completed"]
//     const isValidOperations = updates.every((update) => isAllowedToUpdate.includes(update))

//     if(_id.length !== 24)
//     {
//         return res.status(400).send("Invalid Id")
//     }
//     if(!isValidOperations)
//     {
//         return res.status(400).send("Invalid updates")
//     }
//     try {
//         //const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
//         const task = await Task.findById(req.params.id)
//         updates.forEach((update) => task[update] = req.body[update])
//         await task.save()
//         if(!task)
//         {
//             return res.status(404).send("Task not found")
//         }
//         res.send(task)
//     } catch (error) {
//         res.status(400).send(error)
//     }
// })

router.patch('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const isAllowedToUpdate = ["description", "completed"]
    const isValidOperations = updates.every((update) => isAllowedToUpdate.includes(update))

    if(_id.length !== 24)
    {
        return res.status(400).send("Invalid Id")
    }
    if(!isValidOperations)
    {
        return res.status(400).send("Invalid updates")
    }
    try {
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id})
        
        if(!task)
        {
            return res.status(404).send("Task not found")
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()

        res.send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

// router.delete('/tasks/delete/:id', async (req, res) => {
//     console.log("here")
//     try {
//         const _id = req.params.id
//         if(_id.length !== 24)
//         {
//             return res.status(400).send("ID is invalid")
//         }
//         const task = await Task.findByIdAndDelete(req.params.id)
//         if(!task)
//         {
//             return res.status(404).send("Task not found")
//         }
//         res.send(task)

//     } catch (error) {
//         console.log("error")
//         res.status(400).send(error)
//     }
// })

router.delete('/tasks/delete/:id', auth, async (req, res) => {
    console.log("here")
    try {
        const _id = req.params.id
        if(_id.length !== 24)
        {
            return res.status(400).send("ID is invalid")
        }
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id})
        if(!task)
        {
            return res.status(404).send("Task not found")
        }
        res.send(task)

    } catch (error) {
        console.log("error")
        res.status(400).send(error)
    }
})

module.exports = router