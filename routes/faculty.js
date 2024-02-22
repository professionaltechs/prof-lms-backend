const express = require("express");
const {
  selectFacultyCourses,
  getCourseStudents,
  getSpecificCourseStudents,
} = require("../controllers/faculty.js");
const { requireSignin } = require("../helper/validation.js");
const { isFaculty } = require("../helper/validation.js");

const router = express.Router();

router.get("/get-course-students", requireSignin, isFaculty, getCourseStudents);
router.get(
  "/get-specific-course-students",
  requireSignin,
  isFaculty,
  getSpecificCourseStudents
);
router.post(
  "/select-faculty-courses",
  requireSignin,
  isFaculty,
  selectFacultyCourses
);

module.exports = router;
