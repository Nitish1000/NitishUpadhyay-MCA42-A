const errorHandler = (err, req, res, next) => {

    console.error(err);

    if (err.name === "ValidationError") {
        return res.status(400).json({
            message: err.message
        });
    }

    if (err.code === 11000) {
        return res.status(409).json({
            message: "Duplicate email or roll number."
        });
    }

    if (err.name === "CastError") {
        return res.status(400).json({
            message: "Invalid ID format."
        });
    }

    res.status(500).json({
        message: "Internal Server Error"
    });

};

module.exports = errorHandler;