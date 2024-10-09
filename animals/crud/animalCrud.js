const Animal = require("../model/Animal");// Import the Animal model
const { createError } = require("../../utils/handleErrors"); // Import error handling utilities

// Function to create a new animal
const createAnimal = async (newAnimal) => {
    try {
        const animal = new Animal(newAnimal); // Create a new instance of the Animal model
        return await animal.save(); // Save the animal to the database
    } catch (error) {
        return createError("Mongoose", error); // Handle any errors during save
    }
};

MediaSourceHandle.export = { createAnimal };