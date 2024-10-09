const express = require("express"); // Import Express framework
const { createAnimal,
    getAllAnimalsByExhibit,
    getAnimalById,
    updateAnimal,
    changeEndangeredStatus,
    deleteAnimal } = require("../crud/animalCrud"); // Import CRUD operations for animals
const { validateAnimalCreation } = require("../validation/createAnimal"); // Import validation schemas
const auth = require("../../auth/authService"); // Import auth middleware
const { validateAnimalUpdate } = require("../validation/updateAnimal");

const router = express.Router(); // Create an Express router

// POST /Zoo/animals - Create a new animal
router.post("/", auth, async (req, res) => { // Protect route with auth
    const { error } = validateAnimalCreation(req.body); // Validate incoming data
    if (error) return res.status(400).send(error.details[0].message); // Return error if validation fails

    const newAnimal = req.body; // Get the new animal data from the request body
    const result = await createAnimal(newAnimal); // Attempt to create the animal
    if (result instanceof Error) return res.status(result.status || 500).send(result.message); // Return error if creation fails

    res.status(201).send(result); // Return the created animal with 201 status
});

// GET /Zoo/animals/exhibit/:exhibitId - Get all animals for a specific exhibit
router.get("/exhibit/:exhibitId", async (req, res) => {
    const exhibitId = req.params.exhibitId; // Get the exhibit ID from the request parameters
    const result = await getAllAnimalsByExhibit(exhibitId); // Fetch animals for the exhibit
    if (result instanceof Error) return res.status(result.status || 500).send(result.message); // Return error if fetching fails

    res.send(result); // Return the list of animals
});

// GET /Zoo/animals/:id - Get an animal by ID
router.get("/:id", async (req, res) => {
    const id = req.params.id; // Get the animal ID from the request parameters
    const result = await getAnimalById(id); // Fetch the animal by ID
    if (result instanceof Error) return res.status(result.status || 500).send(result.message); // Return error if fetching fails

    res.send(result); // Return the found animal
});

// PUT /Zoo/animals/:id - Update an animal by ID
router.put("/:id", auth, async (req, res) => { // Protect route with auth
    const id = req.params.id; // Get the animal ID from the request parameters
    const { error } = validateAnimalUpdate(req.body); // Validate incoming data
    if (error) return res.status(400).send(error.details[0].message); // Return error if validation fails

    const result = await updateAnimal(id, req.body); // Attempt to update the animal
    if (result instanceof Error) return res.status(result.status || 500).send(result.message); // Return error if updating fails

    res.send(result); // Return the updated animal
});

// PATCH /Zoo/animals/:id/endangered - Change the endangered status of an animal
router.patch("/:id/endangered", auth, async (req, res) => { // Protect route with auth
    const id = req.params.id; // Get the animal ID from the request parameters
    const { isEndangered } = req.body; // Get the new endangered status from the request body

    const result = await changeEndangeredStatus(id, isEndangered); // Attempt to update the endangered status
    if (result instanceof Error) return res.status(result.status || 500).send(result.message); // Return error if updating fails

    res.send(result); // Return the updated animal
});

// DELETE /Zoo/animals/:id - Delete an animal by ID
router.delete("/:id", auth, async (req, res) => { // Protect route with auth
    const id = req.params.id; // Get the animal ID from the request parameters
    const result = await deleteAnimal(id); // Attempt to delete the animal
    if (result instanceof Error) return res.status(result.status || 500).send(result.message); // Return error if deletion fails

    res.send(result); // Return success message
});

// Export the router for use in other modules
module.exports = router; 