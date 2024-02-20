const express = require('express')

// DATABASE
require('./db/db.js')

// ROUTES
const registerRoutes = require('./routes/auth.js')

const app = express()
const port = process.env.PORT || 8080


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/users', registerRoutes)


app.listen(port, () => {
    console.log('server running')
})