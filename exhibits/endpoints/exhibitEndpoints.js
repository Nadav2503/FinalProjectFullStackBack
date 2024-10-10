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
const { validateExhibitAnimalsUpdate } = require("../validation/updateAnimalsExhibit"); // Import validation schemas
const { validateExhibitUpdate } = require("../validation/updateExhibit"); // Import validation schemas
const { validateExhibitCreation } = require("../validation/createExhibit"); // Import validation schemas

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

// POST /exhibits - Create a new exhibit (admin-only)
router.post("/", auth, async (req, res) => { // Protect route with auth
    try {
        const visitorInfo = req.visitor; // Get visitor info from the request
        if (!visitorInfo.isAdmin) {
            return handleError(res, 403, "Only admin can create new exhibits.");
        }

        const { error } = validateExhibitCreation(req.body); // Validate incoming data
        if (error) return res.status(400).send(error.details[0].message); // Return validation error if present

        const newExhibit = req.body; // Get new exhibit data from the request body
        const result = await createExhibit(newExhibit); // Attempt to create the exhibit
        res.status(201).send(result); // Return created exhibit with 201 status
    } catch (error) {
        handleError(res, error.status || 500, error.message); // Handle unexpected errors
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

// PUT Zoo/exhibits/:id - Update an exhibit by ID
router.put("/:id", auth, async (req, res) => { // Protect route with auth
    try {
        const visitorInfo = req.visitor; // Get visitor info from the request
        if (!visitorInfo.isAdmin) {
            return handleError(res, 403, "Only admin can update exhibits.");
        }

        const exhibitId = req.params.id; // Get exhibit ID from request parameters
        const { error } = validateExhibitUpdate(req.body); // Validate incoming data
        if (error) return handleError(res, 400, error.details[0].message); // Return validation error if present

        const updatedExhibit = await updateExhibit(exhibitId, req.body); // Attempt to update the exhibit
        res.send(updatedExhibit); // Return updated exhibit
    } catch (error) {
        handleError(res, error.status || 500, error.message); // Handle unexpected errors
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
