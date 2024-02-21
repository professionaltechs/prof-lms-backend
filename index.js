const express = require('express')
require("dotenv").config();

// DATABASE
require('./db/db.js')

// ROUTES
const registerRoutes = require('./routes/auth.js')
const adminRoutes = require('./routes/admin.js')
const studentRoutes = require('./routes/student.js')

const app = express()
const port = process.env.PORT || 8080


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/auth', registerRoutes)
app.use('/api/v1/admin', adminRoutes)
app.use('/api/v1/student', studentRoutes)


app.listen(port, () => {
    console.log('server running')
})