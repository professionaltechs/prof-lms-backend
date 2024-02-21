const getAllCourses = async (req, res) => {
    try {
        const courses = req.body.user.courses
        res.status(200).json({ message: "success", data: courses })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error in get all courses controller", data: error })

    }
}


module.exports = { getAllCourses }