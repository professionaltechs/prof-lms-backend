const studentModel = require("../models/userStudent.js");
const facultyModel = require("../models/userFaculty.js");
const adminModel = require("../models/userAdmin.js");
const jwt = require("jsonwebtoken");

// HELPER
const { hashPassword, compareHashedPassword } = require("../helper/bcrypt.js");

async function createNewUser(req, res) {
  if (req.params.userType < 0 || req.params.userType > 2)
    return res.status(500).json({
      message: "Incorrect user type",
    });
  try {
    const hashedPassword = await hashPassword(req.body.password);
    const userType = req.params.userType;
    // 0 = student, 1= faculty , 2= admin
    if (userType == 0) {
      await studentModel.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        userType: 0,
      });
    } else if (userType == 1) {
      await facultyModel.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        userType: 1,
      });
    } else {
      await adminModel.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        userType: 2,
      });
    }
    res.status(201).json({
      message: "successfully registered",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error in register controller", data: error });
  }
}

const loginController = async (req, res) => {
  if (req.params.userType < 0 || req.params.userType > 2)
    return res.status(500).json({
      message: "Incorrect user type",
    });
  try {
    const userType = req.params.userType;
    const { email, password } = req.body;
    let user = null;
    if (userType == 0) user = await studentModel.findOne({ email });
    else if (userType == 1) user = await facultyModel.findOne({ email });
    else if (userType == 2) user = await adminModel.findOne({ email });
    if (!user) return res.json({ message: "Incorrect credentials" });
    const passCheck = await compareHashedPassword(password, user.password);
    if (!passCheck)
      return res.status(400).json({ message: "Incorrect credentials" });
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });
    return res.status(200).json({
      message: "logged in successfully",
      data: {
        name: user.name,
        email: user.email,
        userType: user.userType,
        token: token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in login controller", data: error });
  }
};

module.exports = { createNewUser, loginController };
