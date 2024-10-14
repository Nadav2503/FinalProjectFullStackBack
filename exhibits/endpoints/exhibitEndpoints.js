const express = require("express"); // Import Express framework
const {
    getAllExhibits,
    createExhibit,
    getExhibitById,
    updateExhibit,
    updateExhibitAnimals,
    deleteExhibit
} = require("../crud/exhibitCrud"); // Import CRUD operations for exhibits
const auth = require("../../auth/authService"); // Import auth middleware
const { handleError } = require("../../middlewares/errorHandler"); // Import error handling function
const { normalizeExhibit } = require("../../utils/normalizing/normalizeExhibit"); // Import normalization for exhibit
const { validateExhibitCreation, validateExhibitUpdate, validateExhibitAnimalsUpdate } = require("../validation/exhibitValidationService"); // Import validation schemas

const router = express.Router(); // Create an Express router

// GET /exhibits - Retrieve all exhibits (accessible to all users)
router.get("/", async (req, res) => {
    try {
        const exhibits = await getAllExhibits(); // Fetch all exhibits
        res.status(200).send(exhibits); // Return exhibits with 200 status
    } catch (error) {
        handleError(res, error.status || 500, error.message); // Handle unexpected errors
    }
});

// POST /exhibits - Create a new exhibit
router.post("/", auth, async (req, res) => {
    try {
        const visitorInfo = req.visitor; // Retrieve visitor information from request
        if (!visitorInfo.isAdmin) { // Check if visitor has admin privileges
            return handleError(res, 403, "Only admin can create new exhibits."); // Return forbidden error for non-admins
        }

        const { error } = validateExhibitCreation(req.body); // Validate incoming exhibit data
        if (error) return res.status(400).send(error.details[0].message); // Return validation error if any

        const newExhibit = normalizeExhibit(req.body); // Normalize data to ensure defaults
        const result = await createExhibit(newExhibit); // Create the exhibit in the database
        res.status(201).send(result); // Return created exhibit with HTTP 201 status
    } catch (error) {
        handleError(res, error.status || 500, error.message); // Handle errors if they occur
    }
});

// GET Zoo/exhibits/:id - Retrieve a specific exhibit by ID
router.get("/:id", async (req, res) => {
    try {
        const exhibitId = req.params.id; // Get exhibit ID from request parameters
        const result = await getExhibitById(exhibitId); // Fetch exhibit by ID
        res.send(result); // Return found exhibit
    } catch (error) {
        handleError(res, error.status || 500, error.message); // Handle unexpected errors
    }
});

// PUT Zoo/exhibits/:id - Update an exhibit by its ID
router.put("/:id", auth, async (req, res) => {
    try {
        const visitorInfo = req.visitor; // Retrieve visitor information from request
        if (!visitorInfo.isAdmin) { // Check if visitor has admin privileges
            return handleError(res, 403, "Only admin can update exhibits."); // Return forbidden error for non-admins
        }

        const exhibitId = req.params.id; // Get the exhibit ID from the URL
        const { error } = validateExhibitUpdate(req.body); // Validate incoming exhibit data
        if (error) return handleError(res, 400, error.details[0].message); // Return validation error if any

        const updatedExhibitData = normalizeExhibit(req.body); // Normalize data to ensure defaults
        const updatedExhibit = await updateExhibit(exhibitId, updatedExhibitData); // Update the exhibit in the database
        res.send(updatedExhibit); // Return the updated exhibit data
    } catch (error) {
        handleError(res, error.status || 500, error.message); // Handle errors if they occur
    }
});

// PATCH Zoo/exhibits/:id/animals - Update animals array by adding/removing animals
router.patch("/:id/animals", auth, async (req, res) => { // Protect route with auth
    try {
        const visitorInfo = req.visitor; // Get visitor info from the request
        if (!visitorInfo.isAdmin) {
            return handleError(res, 403, "Only admin can modify exhibit animals.");
        }

        // Validate the request body
        const { error } = validateExhibitAnimalsUpdate(req.body);
        if (error) return handleError(res, 400, error.details[0].message); // Return validation error

        const exhibitId = req.params.id; // Get exhibit ID from request parameters
        const { addAnimals, removeAnimals } = req.body; // Get animals to add or remove
        const updatedExhibit = await updateExhibitAnimals(exhibitId, addAnimals, removeAnimals); // Update animals array

        res.send(updatedExhibit); // Return updated exhibit
    } catch (error) {
        handleError(res, error.status || 500, error.message); // Handle unexpected errors
    }
});

// DELETE Zoo/exhibits/:id - Delete an exhibit by ID
router.delete("/:id", auth, async (req, res) => { // Protect route with auth
    try {
        const visitorInfo = req.visitor; // Get visitor info from the request
        if (!visitorInfo.isAdmin) {
            return handleError(res, 403, "Only admin can delete exhibits.");
        }

        const exhibitId = req.params.id; // Get exhibit ID from request parameters
        const result = await deleteExhibit(exhibitId); // Attempt to delete exhibit

        res.send(result); // Return success message
    } catch (error) {
        handleError(res, error.status || 500, error.message); // Handle unexpected errors
    }
});

// Export the router for use in other modules
module.exports = router;
