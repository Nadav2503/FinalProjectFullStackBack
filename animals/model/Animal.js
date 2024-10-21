const mongoose = require("mongoose");
const { DEFAULT_VALIDATION } = require("../../models/defaults");
const IMAGE = require("../../models/Image");

const AnimalSchema = new mongoose.Schema({
    name: DEFAULT_VALIDATION,
    type: DEFAULT_VALIDATION,
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true,
    },
    age: {
        type: Number,
        required: true,
        min: 1, // Ensures age is at least 1
    },
    description: DEFAULT_VALIDATION,
    diet: {
        type: String,
        enum: ['omnivore', 'carnivore', 'herbivore'],
        required: true,
    },
    isEndangered: {
        type: Boolean,
        required: true,
    },
    healthStatus: DEFAULT_VALIDATION,
    image: {
        type: IMAGE, // Set image as a nested schema using IMAGE
        required: true
    }
});

// Create the Animal model
const Animal = mongoose.model("Animal", AnimalSchema);

// Export the Animal model
module.exports = Animal;
