const express = require('express')
const { requireSignin } = require('../helper/validation.js')
const { getAllCourses } = require('../controllers/general.js')

const router = express.Router()

router.get('/get-all-courses', requireSignin, getAllCourses)

module.exports = router