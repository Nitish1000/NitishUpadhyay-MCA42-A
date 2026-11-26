const User = require("../models/User");

// ADMIN: Get all students
exports.getAllStudents = async (req, res, next) => {

    try {

        const students = await User.find({ role: "student" })
            .select("-password");

        res.json({
            count: students.length,
            students
        });

    } catch (error) {
        next(error);
    }

};


// ADMIN: Get student by ID
exports.getStudentById = async (req, res, next) => {

    try {

        const student = await User.findOne({
            _id: req.params.id,
            role: "student"
        }).select("-password");

        if (!student) {
            return res.status(404).json({
                message: "Student not found."
            });
        }

        res.json(student);

    } catch (error) {
        next(error);
    }

};


// ADMIN: Add student
exports.addStudent = async (req, res, next) => {

    try {

        const { name, email, password, rollNumber, course, mobile, address } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required."
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must contain at least 6 characters."
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists."
            });
        }

        const hashedPassword = await require("bcryptjs").hash(password, 12);

        const student = await User.create({
            name,
            email,
            password: hashedPassword,
            rollNumber,
            course,
            mobile,
            address,
            role: "student"
        });

        res.status(201).json({
            message: "Student added successfully.",
            student: {
                id: student._id,
                name: student.name,
                email: student.email,
                rollNumber: student.rollNumber,
                course: student.course
            }
        });

    } catch (error) {
        next(error);
    }

};


// ADMIN: Update any student
exports.updateStudent = async (req, res, next) => {

    try {

        const allowedFields = [
            "name",
            "email",
            "rollNumber",
            "course",
            "mobile",
            "address"
        ];

        const updates = {};

        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        }

        const student = await User.findOneAndUpdate(
            {
                _id: req.params.id,
                role: "student"
            },
            { $set: updates },
            {
                new: true,
                runValidators: true
            }
        ).select("-password");

        if (!student) {
            return res.status(404).json({
                message: "Student not found."
            });
        }

        res.json({
            message: "Student updated successfully.",
            student
        });

    } catch (error) {
        next(error);
    }

};


// ADMIN: Delete student
exports.deleteStudent = async (req, res, next) => {

    try {

        const student = await User.findOneAndDelete({
            _id: req.params.id,
            role: "student"
        });

        if (!student) {
            return res.status(404).json({
                message: "Student not found."
            });
        }

        res.json({
            message: "Student deleted successfully."
        });

    } catch (error) {
        next(error);
    }

};


// STUDENT: Get own profile
exports.getMyProfile = async (req, res) => {

    res.json({
        student: req.user
    });

};


// STUDENT: Update own profile
exports.updateMyProfile = async (req, res, next) => {

    try {

        const allowedFields = [
            "name",
            "mobile",
            "address"
        ];

        const updates = {};

        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        }

        const student = await User.findOneAndUpdate(
            {
                _id: req.user._id,
                role: "student"
            },
            { $set: updates },
            {
                new: true,
                runValidators: true
            }
        ).select("-password");

        if (!student) {
            return res.status(404).json({
                message: "Student not found."
            });
        }

        res.json({
            message: "Profile updated successfully.",
            student
        });

    } catch (error) {
        next(error);
    }

};