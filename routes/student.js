const express = require('express')

// MIDDLEWWARES
const { requireSignin, isStudent } = require('../helper/validation.js')

// CONTROLLERS
const { getAllCourses } = require('../controllers/student.js')

const router = express.Router()

// ROUTES
router.get('/get-student-courses', requireSignin, isStudent, getAllCourses)


module.exports = router