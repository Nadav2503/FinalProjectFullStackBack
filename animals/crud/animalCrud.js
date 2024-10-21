const Animal = require("../model/Animal"); // Import the Animal model
const { createError } = require("../../middlewares/errorHandler"); // Import error handling utilities
const config = require("config");
const Exhibit = require("../../exhibits/model/Exhibit");
const DB = config.get("DB"); // Get the database configuration

// Function to create a new animal
const createAnimal = async (newAnimal) => {
    if (DB == "mongodb") {
        try {
            const animal = new Animal(newAnimal); // Create a new instance of the Animal model
            return await animal.save(); // Save the animal to the database
        } catch (error) {
            return createError("Mongoose", error); // Handle any errors during save
        }
    }
    const error = new Error("There is no other DB for this request");
    error.status = 500; // Set status to Internal Server Error
    return createError("DB", error);
};

// Function to retrieve all animals belonging to a specific exhibit
const getAllAnimalsByExhibit = async (exhibitId) => {
    if (DB == "mongodb") {
        try {
            // Fetch the exhibit first
            const exhibit = await Exhibit.findById(exhibitId); // Make sure you have the Exhibit model imported

            if (!exhibit) {
                const error = new Error("Exhibit not found");
                error.status = 404;
                return createError("Mongoose", error);
            }

            // Now use the animal IDs in the exhibit to fetch the animals
            return await Animal.find({ _id: { $in: exhibit.animals } }); // Fetch animals using the IDs
        } catch (error) {
            return createError("Mongoose", error); // Handle any errors during fetching
        }
    }
    const error = new Error("There is no other DB for this request");
    error.status = 500; // Set status to Internal Server Error
    return createError("DB", error);
};

// Function to retrieve an animal by ID
const getAnimalById = async (id) => {
    if (DB == "mongodb") {
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
    }
    const error = new Error("There is no other DB for this request");
    error.status = 500; // Set status to Internal Server Error
    return createError("DB", error);
};

// Function to update an animal by ID
const updateAnimal = async (id, updatedData) => {
    if (DB == "mongodb") {
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
    }
    const error = new Error("There is no other DB for this request");
    error.status = 500; // Set status to Internal Server Error
    return createError("DB", error);
};

// Function to update the isEndangered status of an animal by ID
const changeEndangeredStatus = async (id, isEndangered) => {
    if (DB == "mongodb") {
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
    }
    const error = new Error("There is no other DB for this request");
    error.status = 500; // Set status to Internal Server Error
    return createError("DB", error);
};

// Function to delete an animal by ID
const deleteAnimal = async (id) => {
    if (DB == "mongodb") {
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
    }
    const error = new Error("There is no other DB for this request");
    error.status = 500; // Set status to Internal Server Error
    return createError("DB", error);
};

module.exports = { createAnimal, getAllAnimalsByExhibit, getAnimalById, updateAnimal, changeEndangeredStatus, deleteAnimal };
