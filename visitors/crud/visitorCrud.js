const Visitor = require("../model/Visitor"); // Import Visitor model
const { createError } = require("../../middlewares/errorHandler"); // Error handling utilities
const { generatVisitorPassword, comparePasswords } = require("../../utils/bcrypt");  // For hashing passwords
const config = require("config");
const DB = config.get("DB"); // Database configuration

// Retrieve all visitors - Admin Only
const getAllVisitors = async () => {
    if (DB === "mongodb") {
        try {
            return await Visitor.find(); // Retrieve all visitor records
        } catch (error) {
            return createError("Mongoose", error); // Error handling
        }
    }
    return createError("DB", new Error("Database not configured for this request"));
};

// Register a new visitor
const registerVisitor = async (visitorData) => {
    if (DB === "mongodb") {
        try {
            // Hash the password before saving
            visitorData.password = generatVisitorPassword(visitorData.password);
            const newVisitor = new Visitor(visitorData);
            return await newVisitor.save();
        } catch (error) {
            return createError("Mongoose", error); // Error handling
        }
    }
    return createError("DB", new Error("Database not configured for this request"));
};

// Visitor login 
const loginVisitor = async (identifier, password) => {
    if (DB === "mongodb") {
        try {
            // Find by username or email
            const visitor = await Visitor.findOne({ $or: [{ email: identifier }, { username: identifier }] });
            if (!visitor || !(await comparePasswords(password, visitor.password))) {
                return createError("Auth", new Error("Invalid username/email or password"));
            }
            return visitor; // Return visitor data on successful login
        } catch (error) {
            return createError("Mongoose", error);
        }
    }
    return createError("DB", new Error("Database not configured for this request"));
};

// Update visitor profile 
const updateVisitorProfile = async (id, updatedData) => {
    if (DB === "mongodb") {
        try {
            const visitor = await Visitor.findByIdAndUpdate(id, updatedData, { new: true }); // Update profile and return new data
            if (!visitor) {
                return createError("Mongoose", new Error("Visitor not found"));
            }
            return visitor;
        } catch (error) {
            return createError("Mongoose", error);
        }
    }
    return createError("DB", new Error("Database not configured for this request"));
};

// Retrieve a visitor profile by ID
const getVisitorById = async (id) => {
    if (DB === "mongodb") {
        try {
            const visitor = await Visitor.findById(id); // Fetch visitor by ID
            if (!visitor) {
                return createError("Mongoose", new Error("Visitor not found"));
            }
            return visitor;
        } catch (error) {
            return createError("Mongoose", error);
        }
    }
    return createError("DB", new Error("Database not configured for this request"));
};

module.exports = {
    getAllVisitors,
    registerVisitor,
    loginVisitor,
    updateVisitorProfile,
    getVisitorById
};