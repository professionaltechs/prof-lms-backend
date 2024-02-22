const mongoose = require('mongoose')

const courseModel = new mongoose.Schema({
    courseName: {
        type: String,
        required: true,
    },
    courseNumber: {
        type: Number,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('course', courseModel)