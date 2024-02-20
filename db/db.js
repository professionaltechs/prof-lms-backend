const mongoose = require("mongoose");



mongoose
    .connect('mongodb+srv://affan1:proflmsbackend@cluster0.3gosgtf.mongodb.net/lms?retryWrites=true&w=majority')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Could not connect to MongoDB...', err));


module.exports = mongoose;