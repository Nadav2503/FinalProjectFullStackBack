const mongoose = require("mongoose");
const { DEFAULT_VALIDATION } = require("./defaults");

const NameSchema = new mongoose.Schema({
    first: DEFAULT_VALIDATION, // Required first name
    middle: {
        ...DEFAULT_VALIDATION,
        required: false, // Middle name is optional
        minLength: 0, // Minimum length of 0 allows for empty middle names
    },
    last: DEFAULT_VALIDATION, // Required last name
});

module.exports = mongoose.model("Name", NameSchema);