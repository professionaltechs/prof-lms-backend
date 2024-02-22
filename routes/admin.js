const express = require('express')
const { requireSignin, isAdmin } = require('../helper/validation.js')
const { createCourse, addStudentCourses, getAllStudents, getAllFaculty } = require('../controllers/admin.js')

const router = express.Router()

// ROUTES
router.get('/get-all-students', requireSignin, isAdmin, getAllStudents)
router.get('/get-all-faculty', requireSignin, isAdmin, getAllFaculty)
router.post('/add-student-courses', requireSignin, isAdmin, addStudentCourses)
router.post('/create-course', requireSignin, isAdmin, createCourse)

module.exports = router