const express = require('express')
require('./db/mongoose')//By this the file will run and connect to the database
const User = require('./model/user')
const Task = require('./model/task')

const app = express()

const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', (req, res) => {
    const user = new User(req.body)
    user.save().then(() => {
        //
        res.status(201).send(user)
    }).catch ((e) => {
        res.status(400).send(e)
    }) 
})

app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users)
    }).catch((err) => {
        res.status(500).send(err)
    })
})

app.get('/users/:id', (req, res) => {
    const _id = req.params.id
    console.log(req.params)
    console.log(_id.length)

    if(_id.length !== 24)
    {
        return res.status(400).send("Id is invalid")
    }

    User.findById(_id).then((users) => {
        if(!users)
        {
            return res.status(404).send("No user found")
        }
        res.send(users)
    }).catch((err) => {
        res.status(500)
    })
})

app.post('/tasks', (req, res) => {
    const task = new Task(req.body)
    task.save().then(() => {
        res.status(201).send(task)
    }).catch((e) => {
        res.status(400).send(e)
    })
})


app.get('/tasks', (req, res) => {
    Task.find({}).then((tasks) => {
        res.send(tasks)
    }).catch((err) => {
        res.status(500).send(err)
    })
})

app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id
    if(_id.length !== 24)
    {
        return res.status(400).send("Id is invalid")
    }
    Task.findById(_id).then((tasks) => {
        if(!tasks)
        {
            return res.status(404).send("No task found")
        }
        res.send(tasks)
    }).catch((err) => {
        res.status(500)
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})