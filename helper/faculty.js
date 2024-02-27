// MODEL
const facultyModel = require("../models/userFaculty.js");

const isFacultyCourse = async (req, res, next) => {
  try {
    const faculty = req.body.user;
    const courseNumber = req.body.courseNumber.courseNumber;
    if (!faculty.courses.includes(courseNumber)) {
      return res.send({ message: "faculty not teaching this course" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.send({
      message: "Error in faculty course attendence validation",
      data: error,
    });
  }
};

const sessionAttendenceValidation = async (req, res, next) => {
  try {
    const faculty = req.body.user;
    const courseNumber = req.body.courseNumber.courseNumber;
    var datetime = new Date();
    const date =
      datetime.getDate() +
      "/" +
      datetime.getMonth() +
      "/" +
      datetime.getFullYear();
    const dateValidation = await facultyModel.findOne({
      _id: faculty._id,
      "courseAttendence.courseNumber": courseNumber,
      "courseAttendence.allSessions": { $in: [date] },
    });

    if (dateValidation) {
      return res.status(409).send({
        message: "attendence already marked for this session",
      });
    }
    req.body.date = date;
    next();
  } catch (error) {
    console.log(error);
    return res.send({
      message: "Error in session attendence validation",
      data: error,
    });
  }
};

module.exports = { isFacultyCourse, sessionAttendenceValidation };
