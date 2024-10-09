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

// Function to retrieve all animals belonging to a specific exhibit
const getAllAnimalsByExhibit = async (exhibitId) => {
    try {
        return await Animal.find({ exhibitId }); // Fetch animals that belong to the specified exhibit
    } catch (error) {
        return createError("Mongoose", error); // Handle any errors during fetching
    }
};

MediaSourceHandle.export = { createAnimal, getAllAnimalsByExhibit };