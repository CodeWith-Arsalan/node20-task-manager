require('../src/db/mongoose')
const User = require('../src/model/user')

//////This code is working but its lengthy and not async
// User.findByIdAndUpdate('66af53ef32ee3ff88e4248bc', {age: 1}).then((user) => {
//     console.log(user)
//     return User.countDocuments({age: 1})
// }).then((result) => {
//     console.log(result)
// }).catch((err) => {
//     console.log(err)
// })

/////This code is same but async

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age})
    const count = await User.countDocuments({age})
    return count
}

updateAgeAndCount('66af53ef32ee3ff88e4248bc', 2).then((count) => {
    console.log(count)
}).catch((er) => {
    console.log(er)
})
