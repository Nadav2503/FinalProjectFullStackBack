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

// Function to update an animal by ID
const updateAnimal = async (id, updatedData) => {
    try {
        const animal = await Animal.findByIdAndUpdate(id, updatedData, { new: true }); // Update and return the new animal data
        if (!animal) {
            const error = new Error("Animal not found"); // Handle not found case
            error.status = 404; // Set status to Not Found
            return createError("Mongoose", error); // Return error
        }
        return animal; // Return the updated animal
    } catch (error) {
        return createError("Mongoose", error); // Handle any errors during updating
    }
};

// Function to update the isEndangered status of an animal by ID
const changeEndangeredStatus = async (id, isEndangered) => {
    try {
        const animal = await Animal.findByIdAndUpdate(
            id,
            { isEndangered },
            { new: true } // Return the updated animal
        );

        if (!animal) {
            const error = new Error("Animal not found"); // Handle not found case
            error.status = 404; // Set status to Not Found
            return createError("Mongoose", error); // Return error
        }
        return animal; // Return the updated animal with the new endangered status
    } catch (error) {
        return createError("Mongoose", error); // Handle any errors during updating
    }
};

// Function to delete an animal by ID
const deleteAnimal = async (id) => {
    try {
        const result = await Animal.findByIdAndDelete(id); // Delete animal by ID
        if (!result) {
            const error = new Error("Animal not found"); // Handle not found case
            error.status = 404; // Set status to Not Found
            return createError("Mongoose", error); // Return error
        }
        return { message: "Animal deleted successfully" }; // Return success message
    } catch (error) {
        return createError("Mongoose", error); // Handle any errors during deleting
    }
};

MediaSourceHandle.export = { createAnimal, getAllAnimalsByExhibit, getAnimalById, updateAnimal, changeEndangeredStatus, deleteAnimal };