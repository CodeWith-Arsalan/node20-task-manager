const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Task = require('../model/task')

//To add a middleware to let happen pre and post working like pre for password hashing
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        //
        type: String,
        required: true,
        unique: true,
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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
})

//Creating a virtual relationship of user with task for mongoose
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

// Creating a method to hide the array of tokens and passowrd to be visible
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.tokens
    delete userObject.password

    return userObject
}
//Creating method to generate auth token for user at the time of login this user methods because we are using instance of model
userSchema.methods.generateAuthTokens = async function(){
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, "thisisthesecretsignature")

    //to save token on the database with the user data
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token

}

//Creating a resuable function to use and check if user is created so will be used to login the user
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})
    
    if(!user)
    {
        console.log("email incorrect")
        throw new Error("Unable to login")
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch)
    {
        console.log("Password incorrect")
        throw new Error("Invalid Credentials")
    }

    return user

}

//middleware Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this
    console.log('just before saving')
    if(user.isModified('password'))
    {
        user.password = await bcrypt.hash(user.password, 8)
    next()
    }

})

//Middleware Delete user tasks when user is removed
userSchema.pre('deleteOne', async function (next){
    const user = this
    await Task.deleteMany({owner: user._id})
    next()
})

const User = mongoose.model('User', userSchema)


module.exports = User