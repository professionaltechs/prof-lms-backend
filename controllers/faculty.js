const fs = require("fs");
const facultyModel = require("../models/userFaculty.js");
const studentModel = require("../models/userStudent.js");

const getCourseStudents = async (req, res) => {
  try {
    const { courses } = req.body.user;
    const studentLists = [];
    for (let i = 0; i < courses.length; i++) {
      studentLists.push({ [courses[i]]: [] });
      const students = await studentModel
        .find({ courses: { $in: [courses[i]] } })
        .select("name");
      studentLists[i][courses[i]] = [...students];
    }
    res.send({ message: "success", data: studentLists });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error in get course students controller",
      data: error,
    });
  }
};

const getSpecificCourseStudents = async (req, res) => {
  try {
    const { courseName } = req.body;
    const studentLists = [];
    studentLists.push({ [courseName]: [] });
    const students = await studentModel
      .find({ courses: { $in: [courseName] } })
      .select("name");
    studentLists[0][courseName] = [...students];
    res.send({ message: "success", data: studentLists });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error in get course students controller",
      data: error,
    });
  }
};

const selectFacultyCourses = async (req, res) => {
  try {
    const { newcourseList, facultyId } = req.body;
    const { courses } = req.body.user;
    const updatedCourseList = [...new Set([...courses, ...newcourseList])];
    const user = await facultyModel.findByIdAndUpdate(
      facultyId,
      { courses: updatedCourseList },
      { new: true }
    );
    return res.send({ message: "success", data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error in select faculty courses controller",
      data: error,
    });
  }
};

const uploadCourseContent = (req, res) => {
  res.setHeader("Content-Type", "application/pdf");
  var data = fs.readFileSync(req.files[0].path);
  console.log(req.files[0]);
  res.send(data);
};

module.exports = {
  selectFacultyCourses,
  getCourseStudents,
  getSpecificCourseStudents,
  uploadCourseContent,
};
