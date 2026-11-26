
require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const existingAdmin = await User.findOne({
            email: "admin@gmail.com"
        });

        if (existingAdmin) {
            console.log("Admin already exists");
            return;
        }

        const hashedPassword = await bcrypt.hash("Admin@123", 12);

        await User.create({
            name: "Administrator",
            email: "admin@gmail.com",
            password: hashedPassword,
            role: "admin"
        });

        console.log("Admin created successfully!");

    } catch (error) {
        console.error(error);
    } finally {
        await mongoose.disconnect();
    }
};

createAdmin();
