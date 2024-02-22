const express = require('express')

// MODELS
const studentModel = require('../models/userStudent.js')
const courseModel = require('../models/course.js')
const facultyModel = require('../models/userFaculty.js')

const getAllStudents = async (req, res) => {
    try {
        const students = await studentModel.find({})
        return res.json({ message: "success", data: students })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error in get all students controller", data: error })
    }
}

const getAllFaculty = async (req, res) => {
    try {
        const faculty = await facultyModel.find({})
        return res.json({ message: "success", data: faculty })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error in get all faculty controller", data: error })
    }
}

const createCourse = async (req, res) => {
    try {
        const { courseName, courseNumber } = req.body
        const newCourse = await courseModel.create({ courseName, courseNumber })
        return res.status(201).json({ message: "course has been created successfully", data: newCourse })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error in create course controller", data: error })
    }
}


const addStudentCourses = async (req, res) => {
    try {
        const { courseId, studentId } = req.body
        const student = await studentModel.findById(studentId)
        if (!student) return res.json({ message: "student not found" })
        // const course = courseModel.findById(courseId)
        // if (!course) return res.json({ message: "course not found" })   
        const allCourses = [...new Set([...student.courses, ...courseId])]
        const updatedCourses = await studentModel.findByIdAndUpdate(studentId,
            { courses: allCourses },
            { new: true }
        )
        return res.json({ message: "student courses updated successfully", data: { courses: updatedCourses.courses } })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error in add student courses controller", data: error })
    }
}

module.exports = { createCourse, addStudentCourses, getAllStudents, getAllFaculty }