const express = require('express')
require('./db/mongoose')//By this the file will run and connect to the database
const User = require('./model/user')
const Task = require('./model/task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()

const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)
//////This is just the example that we can use this here but now i added router so i shifted this from here to router folder
// app.post('/users', async (req, res) => {
//     const user = new User(req.body)
//     try {
//         await user.save()
//         res.status(201).send(user)
        
//     } catch (error) {
//         res.status(400).send(error)
//     }

//     // user.save().then(() => {
//     //     //
//     //     res.status(201).send(user)
//     // }).catch ((e) => {
//     //     res.status(400).send(e)
//     // }) 
// })

// app.get('/users', async (req, res) => {
//     try {
//         const user = await User.find({})
//         res.send(user)
//     } catch (error) {
//         res.status(500).send(error)
//     }
//     // User.find({}).then((users) => {
//     //     res.send(users)
//     // }).catch((err) => {
//     //     res.status(500).send(err)
//     // })
// })

// app.get('/users/:id', async (req, res) => {
//     const _id = req.params.id
//     console.log(req.params)
//     console.log(_id.length)

//     if(_id.length !== 24)
//     {
//         return res.status(400).send("Id is invalid")
//     }

//     try {
//         const user = await User.findById(_id)
//         if(!user)
//         {
//             return res.status(404).send("No user found")
//         }
//         res.send(user)
//     } catch (error) {
//         res.status(500)
//     }

//     // User.findById(_id).then((users) => {
//     //     if(!users)
//     //     {
//     //         return res.status(404).send("No user found")
//     //     }
//     //     res.send(users)
//     // }).catch((err) => {
//     //     res.status(500)
//     // })
// })

// app.patch('/users/:id', async (req, res) => {
//     const _id = req.params.id
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['name', 'email', 'password', 'age']
//     const isValidOperations = updates.every((update) => allowedUpdates.includes(update))
//     if(_id.length !== 24)
//     {
//         return res.status(404).send("Invalid id")
//     }
//     if(!isValidOperations)
//     {
//         return res.status(400).send("Invalid updates")
//     }
//     try {
//         const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})

//     if(!user)
//     {
//         return res.status(404).send('User not found')
//     }
//     res.send(user)
//     } catch (error) {
//         res.status(400).send(error)
//     }
    
// })

// app.delete('/users/delete/:id', async (req, res) => {
//     try {
//         const _id = req.params.id
//         if(_id.length !== 24)
//         {
//             return res.status(400).send("ID is invalid")
//         }
//         const user = await User.findByIdAndDelete(req.params.id)
//         if(!user)
//         {
//             return res.status(404).send("User not found")
//         }
//         res.send(user)
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })





app.listen(port, () => {
    console.log('Server is up on port '+ port)
})