const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentModel = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    courses : {
        type : Array,
        default : []
    }
})

module.exports = mongoose.model('userStudent', studentModel)