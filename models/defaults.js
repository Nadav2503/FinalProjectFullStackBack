const mongoose = require("mongoose");

// URL Validator
const URL = {
    type: String,
    trim: true,
    lowercase: true,
    match: RegExp(
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
    ),
};

// Email Validator
const EMAIL = {
    type: String,
    required: true,
    match: RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/),
    lowercase: true,
    trim: true,
    unique: true,
};

// Default Validation Schema
const DEFAULT_VALIDATION = {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 256,
    trim: true,
    lowercase: true
};

// Phone Validator
const PHONE = {
    type: String,
    required: false, // Make it optional for visitors
    match: RegExp(/^\+?[0-9]{10,15}$/), // Accepts international formats, adjust as needed
};
// Export validators
module.exports = { URL, EMAIL, DEFAULT_VALIDATION, PHONE };
