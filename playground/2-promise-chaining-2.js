require('../src/db/mongoose')
const Task = require('../src/model/task')

///////This code is working but not in async
// Task.findByIdAndDelete('66af5b55136263b4ecd2a4bf').then((task) => {
//     console.log(task)
//     return Task.find({completed: false})
// }).then((result) => {
//     console.log(result)
// }).catch((er) => {
//     console.log(er)
// })

//////This code is same but async
const deleteTaskAndCount = async (id, completed) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed})
    return count
}

deleteTaskAndCount('66af5b3d136263b4ecd2a4bd', false).then((count) => {
    console.log(count)
}).catch((er) => {
    console.log(er)
})