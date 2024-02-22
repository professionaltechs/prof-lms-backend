const courseModel = require("../models/course.js");

const getAllCourses = async (req, res) => {
  try {
    const courses = await courseModel.find({});
    return res.json({ message: "success", data: courses });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error in get all courses controller", data: error });
  }
};

module.exports = { getAllCourses };
