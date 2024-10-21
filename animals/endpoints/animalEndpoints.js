const express = require("express"); // Import Express framework
const {
    createAnimal,
    getAllAnimalsByExhibit,
    getAnimalById,
    updateAnimal,
    changeEndangeredStatus,
    deleteAnimal
} = require("../crud/animalCrud"); // Import CRUD operations for animals
const auth = require("../../auth/authService"); // Import auth middleware
const { handleError } = require("../../middlewares/errorHandler"); // Import error handling functions
const { normalizeAnimal } = require("../../utils/normalizing/normalizeAnimal"); // Import normalization for animal
const { validateAnimalCreation, validateAnimalUpdate } = require("../validation/animalValidationService"); // Import validation schemas

const router = express.Router(); // Create an Express router

// POST /Zoo/animals - Create a new animal
router.post("/", auth, async (req, res) => { // Protect route with authentication
    try {
        const visitorInfo = req.visitor; // Get visitor information from the request

        // Check if the visitor has permission to create an animal
        if (!visitorInfo.isAdmin && visitorInfo.membershipTier !== 'Tier 4 - Safari Leader') {
            return handleError(res, 403, "Only admin or Safari Leaders can create new animals.");
        }

        const { error } = validateAnimalCreation(req.body); // Validate the incoming data
        if (error) return res.status(400).send(error.details[0].message); // Return error if validation fails

        // Normalize the new animal data
        const normalizedAnimal = normalizeAnimal(req.body);

        const result = await createAnimal(normalizedAnimal); // Attempt to create the animal
        res.status(201).send(result); // Return the created animal with a 201 status
    } catch (error) {
        handleError(res, error.status || 500, error.message); // Handle unexpected errors
    }
});

// PUT /Zoo/animals/:id - Update an animal by ID
router.put("/:id", auth, async (req, res) => { // Protect route with authentication
    try {
        const visitorInfo = req.visitor; // Get visitor information from the request
        // Check if the visitor has permission to update an animal
        if (!visitorInfo.isAdmin) {
            return handleError(res, 403, "Only admin can update animals.");
        }

        const id = req.params.id; // Get the animal ID from the request parameters
        const { error } = validateAnimalUpdate(req.body); // Validate the incoming data
        if (error) return handleError(res, 400, error.details[0].message); // Return error if validation fails

        // Normalize the updated animal data
        const normalizedAnimal = normalizeAnimal(req.body);

        const result = await updateAnimal(id, normalizedAnimal); // Attempt to update the animal
        res.send(result); // Return the updated animal
    } catch (error) {
        handleError(res, error.status || 500, error.message); // Handle unexpected errors
    }
});

// GET /Zoo/animals/exhibit/:exhibitId - Get all animals by exhibit ID
router.get("/exhibit/:exhibitId", async (req, res) => {
    try {
        const exhibitId = req.params.exhibitId; // Get the exhibit ID from the request parameters
        const result = await getAllAnimalsByExhibit(exhibitId); // Fetch all animals by exhibit ID

        res.status(200).send(result); // Return the found animals
    } catch (error) {
        handleError(res, error.status || 500, error.message); // Handle unexpected errors
    }
});

// GET /Zoo/animals/:id - Get an animal by ID
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id; // Get the animal ID from the request parameters
        const result = await getAnimalById(id); // Fetch the animal by ID

        res.send(result); // Return the found animal
    } catch (error) {
        handleError(res, error.status || 500, error.message); // Handle unexpected errors
    }
});

// PATCH /Zoo/animals/:id/endangered - Change the endangered status of an animal
router.patch("/:id/endangered", auth, async (req, res) => { // Protect route with auth
    try {
        const visitorInfo = req.visitor; // Get visitor info from the request
        if (!visitorInfo.isAdmin) {
            return handleError(res, 403, "Only admin can change endangered status.");
        }

        const id = req.params.id; // Get the animal ID from the request parameters

        // Fetch the current animal to check its endangered status
        const animal = await getAnimalById(id);
        if (animal instanceof Error) {
            return handleError(res, animal.status, animal.message);
        }

        // Toggle the isEndangered status
        const newIsEndangeredStatus = !animal.isEndangered;

        const result = await changeEndangeredStatus(id, newIsEndangeredStatus); // Attempt to update the endangered status

        res.send(result); // Return the updated animal
    } catch (error) {
        handleError(res, error.status || 500, error.message); // Handle unexpected errors
    }
});

// DELETE /Zoo/animals/:id - Delete an animal by ID
router.delete("/:id", auth, async (req, res) => { // Protect route with auth
    try {
        const visitorInfo = req.visitor; // Get visitor info from the request
        if (!visitorInfo.isAdmin) {
            return handleError(res, 403, "Only admin can delete animals.");
        }

        const id = req.params.id; // Get the animal ID from the request parameters
        const result = await deleteAnimal(id); // Attempt to delete the animal

        res.send(result); // Return success message
    } catch (error) {
        handleError(res, error.status || 500, error.message); // Handle unexpected errors
    }
});

// Export the router for use in other modules
module.exports = router; 