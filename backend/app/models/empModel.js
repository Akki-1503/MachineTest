const mongoose = require('mongoose')
const Schema = mongoose.Schema

const empSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contact: {
        type: Number,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    avatar: {
        type: Buffer,
    },
    avatarUrl: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Emp = mongoose.model('Emp', empSchema)
module.exports = Emp
