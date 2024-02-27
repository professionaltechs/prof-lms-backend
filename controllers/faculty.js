const fs = require("fs");
const facultyModel = require("../models/userFaculty.js");
const studentModel = require("../models/userStudent.js");

// UPLOAD CONTENT PATH
const { path } = require("../helper/multerConfig.js");

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

const uploadCourseContent = async (req, res) => {
  const { facultyId } = req.body;
  let newCourseContent;
  let allContent = [];
  for (let i = 0; i < req.files.length; i++) {
    const file = req.files[i];
    newCourseContent = {
      contentName: file.filename,
      contentTpye: file.mimetype,
    };
    allContent.push(newCourseContent);
  }
  const updateFacultyCourses = await facultyModel.findByIdAndUpdate(
    facultyId,
    { $push: { courseContent: { $each: allContent } } },
    { new: true }
  );
  res.send({
    message: "Course updated successfully",
    courseContents: updateFacultyCourses,
  });
};

const getFacultyCourseContent = async (req, res) => {
  const { facultyId, fileName, fileType } = req.body;
  let fileData = fs.readFileSync(path + fileName);
  res.setHeader("Content-Type", fileType);
  res.send(fileData);
};

const addAttendence = async (req, res) => {
  try {
    const faculty = req.body.user;
    const courseNumber = req.body.courseNumber.courseNumber;
    console.log(faculty);
    console.log(courseNumber);
    if (!faculty.courses.includes(courseNumber))
      return res.send({ message: "faculty not teaching this course" });
    var datetime = new Date();
    const date =
      datetime.getDate() +
      "/" +
      datetime.getMonth() +
      "/" +
      datetime.getFullYear();
    const updatedAttendece = await facultyModel.findOneAndUpdate(
      { _id: faculty._id },
      // { $addToSet: { courseAttendence: { [courseNumber]: "abc" } } },
      // { $addToSet: { courseAttendence: { [courseNumber]: { [date] : 'abc'} } } },
      {
        $addToSet: { courseAttendence: {301 : []} },
        $push: { "courseAttendence.301": 'abc' }
      },
      { new: true }
    );
    res.send({ message: "test", updatedAttendece });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error in add attendence controller", data: error });
  }
};

module.exports = {
  selectFacultyCourses,
  getCourseStudents,
  getSpecificCourseStudents,
  uploadCourseContent,
  getFacultyCourseContent,
  addAttendence,
};
