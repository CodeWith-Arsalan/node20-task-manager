const mongoose = require('mongoose')
//since we dont have many validations in mongoose so we'll be using validator package
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api')
console.log("Database connected Successfully")

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        //
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value))
            {
                //
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if(value.toLowerCase().includes('password'))
            {
                throw new Error('Password cannot contain "Password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if(value < 0)
            {
                throw new Error("Age must be a positive number")
            }
        }
    }
})

// const me = new User({
//     name: "Arsalan Shahid",
//     email: 'Shahid@gmail.com',
//     password: 'asswor  '
    
// })

// me.save().then(() => {
//     //
//     console.log('User added successfully', me)
// }).catch((error) => {
//     console.log("Error", error)
// })

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const task = new Task({
    description: "Learn validator library",
    
})

task.save().then(() => {
    console.log('Task Saved', task)
}).catch((error) => {
    console.log('Error', error)
})

