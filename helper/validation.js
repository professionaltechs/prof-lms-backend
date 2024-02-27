const express = require("express");
const jwt = require("jsonwebtoken");

// MODELS
const adminModel = require("../models/userAdmin.js");
const studentModel = require("../models/userStudent.js");
const facultyModel = require("../models/userFaculty.js");
const courseModel = require("../models/course.js");

const requireSignin = async (req, res, next) => {
  try {
    const userId = jwt.verify(
      req.headers.authorization,
      process.env.SECRET_KEY
    );
    req.body.userId = userId.userId;
    next();
  } catch (error) {
    console.log(error);
    return res.json({ message: "Error in JWT token", data: error });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await adminModel.findById(req.body.userId);
    if (!user) return res.json({ message: "Admin not found" });
    next();
  } catch (error) {
    console.log(error);
    return res.json({ message: "Error in admin verification", data: error });
  }
};

const isFaculty = async (req, res, next) => {
  try {
    const user = await facultyModel.findById(req.body.userId);
    if (!user) return res.json({ message: "Faculty not found" });
    req.body.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.json({ message: "Error in faculty verification", data: error });
  }
};

const isStudent = async (req, res, next) => {
  try {
    const user = await studentModel.findById(req.body.userId);
    if (!user) return res.json({ message: "Student not found" });
    req.body.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.json({ message: "Error in student verification", data: error });
  }
};

const validCourseNumber = async (req, res, next) => {
  try {
    const { courseNumber } = req.params;
    const course = await courseModel.findOne({courseNumber});
    if (!course) return res.json({ message: "Course not found" });
    req.body.courseNumber = course;
    next();
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error in course number validation", data: error });
  }
};

module.exports = { requireSignin, isAdmin, isStudent, isFaculty, validCourseNumber };
