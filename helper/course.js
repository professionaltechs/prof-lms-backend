// MODELS
const courseModel = require("../models/course.js");

const validCourseNumber = async (req, res, next) => {
  try {
    const { courseNumber } = req.params;
    const course = await courseModel.findOne({ courseNumber });
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

module.exports = { validCourseNumber };
