const mongoose = require("mongoose");
const { DEFAULT_VALIDATION } = require("../../models/defaults");
const ImageSchema = require("../../models/Image");

const AnimalSchema = new mongoose.Schema({
    name: DEFAULT_VALIDATION,
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
    healthStatus: DEFAULT_VALIDATION, // Allows the admin to elaborate on the condition
    image: ImageSchema,
    exhibitId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Exhibit',
    },
});

const Animal = mongoose.model("Animal", AnimalSchema);// put the model in variable

// Export the Animal model
module.exports = Animal;
