require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");

const errorHandler = require("./middleware/errorMiddleware");

const app = express();


// Connect Database
connectDB();


// Middleware
app.use(cors());
app.use(express.json());


// Default Route
app.get("/", (req, res) => {

    res.json({
        message: "Student Management API is running"
    });

});


// API Routes
app.use("/api/auth", authRoutes);

app.use("/api/students", studentRoutes);


// Error Handling
app.use(errorHandler);


// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});