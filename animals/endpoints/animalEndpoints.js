const express = require("express"); // Import Express framework
const { createAnimal } = require("../crud/animalCrud"); // Import CRUD operations for animals
const { validateAnimalCreation } = require("../validation/createAnimal"); // Import validation schemas

const router = express.Router(); // Create an Express router

// POST /Zoo/animals - Create a new animal
router.post("/", async (req, res) => {
    const { error } = validateAnimalCreation(req.body); // Validate incoming data
    if (error) return res.status(400).send(error.details[0].message); // Return error if validation fails

    const newAnimal = req.body; // Get the new animal data from the request body
    const result = await createAnimal(newAnimal); // Attempt to create the animal
    if (result instanceof Error) return res.status(result.status || 500).send(result.message); // Return error if creation fails

    res.status(201).send(result); // Return the created animal with 201 status
});

module.exports = router; 