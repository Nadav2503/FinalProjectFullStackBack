const mongoose = require("mongoose");
const { URL, DEFAULT_VALIDATION } = require("./defaults");
const { required } = require("joi");


const IMAGE = new mongoose.Schema({
    url: {
        URL,
        required: false
    }, // Uses the URL validator defined in your validators
    alt: {
        DEFAULT_VALIDATION,
        required: false
    } // Uses the default validation defined in your validators
});

module.exports = IMAGE;
