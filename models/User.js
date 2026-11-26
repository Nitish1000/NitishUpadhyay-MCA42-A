const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false
    },

    rollNumber: {
        type: String,
        unique: true,
        sparse: true
    },

    course: {
        type: String,
        default: ""
    },

    mobile: {
        type: String,
        default: ""
    },

    address: {
        type: String,
        default: ""
    },

    role: {
        type: String,
        enum: ["admin", "student"],
        default: "student"
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);