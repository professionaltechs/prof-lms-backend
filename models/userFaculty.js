const mongoose = require("mongoose");
const { Schema } = mongoose;

const facultyModel = new Schema({
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
    userType : {
        type : Number,
    }
})

module.exports = mongoose.model('userFaculty', facultyModel)