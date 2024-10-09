const mongoose = require("mongoose");
const { URL, DEFAULT_VALIDATION } = require("./defaults");


const ImageSchema = new mongoose.Schema({
    url: URL, // Uses the URL validator defined in your validators
    alt: DEFAULT_VALIDATION, // Uses the default validation defined in your validators
});

module.exports = ImageSchema;
