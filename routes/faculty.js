const express = require("express");
const multer = require("multer");
const {
  selectFacultyCourses,
  getCourseStudents,
  getSpecificCourseStudents,
  uploadCourseContent,
  getFacultyCourseContent,
} = require("../controllers/faculty.js");
const { requireSignin } = require("../helper/validation.js");
const { isFaculty } = require("../helper/validation.js");

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

module.exports = router;
