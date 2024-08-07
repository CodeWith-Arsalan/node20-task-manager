const express = require('express')

const User = require('../model/user')

const router = new express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
        
    } catch (error) {
        res.status(400).send(error)
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

router.patch('/users/:id', async (req, res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperations = updates.every((update) => allowedUpdates.includes(update))
    if(_id.length !== 24)
    {
        return res.status(404).send("Invalid id")
    }
    if(!isValidOperations)
    {
        return res.status(400).send("Invalid updates")
    }
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})

    if(!user)
    {
        return res.status(404).send('User not found')
    }
    res.send(user)
    } catch (error) {
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

module.exports = router