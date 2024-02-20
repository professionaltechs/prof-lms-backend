const express = require('express')
const { createNewUser,loginController } = require('../controllers/auth')

const router = express.Router()

router.post('/register/:userType', createNewUser)
router.post('/login/:userType',loginController)


module.exports = router