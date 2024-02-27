const express = require("express");
const multer = require("multer");

// HELPERS
const { requireSignin, isFaculty } = require("../helper/validation.js");

// FACULTY HELPERS
const { isFacultyCourse, sessionAttendenceValidation } = require("../helper/faculty.js");

// COURSE HELPERS
const { validCourseNumber } = require("../helper/course.js");

// CONTROLLERS
const {
  selectFacultyCourses,
  getCourseStudents,
  getSpecificCourseStudents,
  uploadCourseContent,
  getFacultyCourseContent,
  addAttendence,
} = require("../controllers/faculty.js");

// MULTER
const { upload } = require("../helper/multerConfig.js");

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
router.post(
  "/upload-course-content",
  requireSignin,
  isFaculty,
  upload.array("content", 4),
  uploadCourseContent
);
router.get(
  "/get-faculty-courses",
  requireSignin,
  isFaculty,
  getFacultyCourseContent
);

router.post(
  "/add-attendence/:courseNumber",
  requireSignin,
  isFaculty,
  validCourseNumber,
  isFacultyCourse,
  sessionAttendenceValidation,
  addAttendence
);

module.exports = router;
