const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const authorizeRole = require("../middleware/roleMiddleware");

const {
    getAllStudents,
    getStudentById,
    addStudent,
    updateStudent,
    deleteStudent,
    getMyProfile,
    updateMyProfile
} = require("../controllers/studentController");


// All routes below require authentication
router.use(protect);


// STUDENT ROUTES
router.get("/me", authorizeRole("student"), getMyProfile);

router.put("/me", authorizeRole("student"), updateMyProfile);


// ADMIN ROUTES
router.get("/", authorizeRole("admin"), getAllStudents);

router.get("/:id", authorizeRole("admin"), getStudentById);

router.post("/", authorizeRole("admin"), addStudent);

router.put("/:id", authorizeRole("admin"), updateStudent);

router.delete("/:id", authorizeRole("admin"), deleteStudent);


module.exports = router;