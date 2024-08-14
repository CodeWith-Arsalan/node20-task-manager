const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL)
console.log("Database connected Successfully")



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

// const Task = mongoose.model('Task', {
//     description: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     }
// })

// const task = new Task({
//     description: "Learn validator library",
    
// })

// task.save().then(() => {
//     console.log('Task Saved', task)
// }).catch((error) => {
//     console.log('Error', error)
// })

