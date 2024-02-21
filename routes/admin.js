const express = require('express')
const { requireSignin, isAdmin } = require('../helper/validation.js')
const { createCourse, addStudentCourses } = require('../controllers/admin.js')

const router = express.Router()

router.post('/add-student-courses', requireSignin, isAdmin, addStudentCourses)

router.post('/create-course', requireSignin, isAdmin, createCourse)

module.exports = router