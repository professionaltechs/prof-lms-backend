const express = require("express");
const multer = require("multer");

// HELPERS
const {
  requireSignin,
  isFaculty,
  validCourseNumber,
} = require("../helper/validation.js");

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
  addAttendence
);

module.exports = router;
