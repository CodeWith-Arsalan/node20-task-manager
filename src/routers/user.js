const express = require('express')

const User = require('../model/user')
const auth = require('../middleware/auth')
const multer = require('multer')


const router = new express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthTokens()
        res.status(201).send({user, token})
        
    } catch (error) {
        console.log("user creation error", error)
        res.status(400).send(error)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthTokens()
    
        res.send({user, token})    
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
    
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})
router.get('/users', async (req, res) => {
    try {
        const user = await User.find({})
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    console.log(req.params)
    console.log(_id.length)

    if(_id.length !== 24)
    {
        return res.status(400).send("Id is invalid")
    }

    try {
        const user = await User.findById(_id)
        if(!user)
        {
            return res.status(404).send("No user found")
        }
        res.send(user)
    } catch (error) {
        res.status(500)
    }
})

// router.patch('/users/:id', async (req, res) => {
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
//         ////middleware is not working by this updating so i'm adding the traditional way of mongoose to update the user and allow the pre work to be applied like password hashing
//         //const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
//         const user = await User.findById(req.params.id)
//         updates.forEach((update) => user[update] = req.body[update])
//         await user.save()
//     if(!user)
//     {
//         return res.status(404).send('User not found')
//     }
//     res.send(user)
//     } catch (error) {
//         console.log('error update')
//         res.status(400).send(error)
//     }
    
// })

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperations = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidOperations)
    {
        return res.status(400).send("Invalid updates")
    }
    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()

    res.send(req.user)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
    
})

router.delete('/users/delete/:id', async (req, res) => {
    try {
        const _id = req.params.id
        if(_id.length !== 24)
        {
            return res.status(400).send("ID is invalid")
        }
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user)
        {
            return res.status(404).send("User not found")
        }
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.deleteOne()
        res.send(req.user)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

const upload = multer({
    limits: {
        fileSize: 1000000 //1mb
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/))//regular expression Regex
        {
            return cb(new Error("Please upload an image"))
        }
        cb(undefined, true)
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    req.user.avatar = req.file.buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

module.exports = router