const Animal = require("../model/Animal"); // Import the Animal model
const { createError } = require("../../middlewares/errorHandler"); // Import error handling utilities

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

// Function to retrieve an animal by ID
const getAnimalById = async (id) => {
    try {
        const animal = await Animal.findById(id); // Fetch animal by ID
        if (!animal) {
            const error = new Error("Animal not found"); // Handle not found case
            error.status = 404; // Set status to Not Found
            return createError("Mongoose", error); // Return error
        }
        return animal; // Return the found animal
    } catch (error) {
        return createError("Mongoose", error); // Handle any errors during fetching
    }
};

MediaSourceHandle.export = { createAnimal, getAllAnimalsByExhibit, getAnimalById };