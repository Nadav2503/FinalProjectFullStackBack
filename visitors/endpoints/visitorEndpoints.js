const express = require("express");
const { handleError } = require("../../middlewares/errorHandler");
const auth = require("../../auth/authService");
const {
    getAllVisitors,
    registerVisitor,
    loginVisitor,
    getVisitorById,
    deleteVisitor,
    toggleLikeAnimal,
    updateVisitorProfile
} = require("../crud/visitorCrud");
const { normalizeVisitor } = require("../../utils/normalizing/normalizeVisitor");
const { validateRegister, validateLogin, validateUpdateVisitor } = require("../validation/visitorValidationService");

const router = express.Router(); // Create an Express router

// GET Zoo/visitors
router.get("/", auth, async (req, res) => {
    try {
        // Check if the user is an admin
        if (!req.visitor.isAdmin) {
            return handleError(res, 403, "Only admins can view all visitors.");
        }
        const visitors = await getAllVisitors(); // Fetch all visitors
        res.status(200).send(visitors); // Return visitors with 200 status
    } catch (error) {
        handleError(res, error.status || 500, error.message); // Handle unexpected errors
    }
});

// POST Zoo/visitors/register - Register a new visitor
router.post("/register", async (req, res) => {
    try {
        const { error } = validateRegister(req.body); // Validate incoming visitor data
        if (error) return res.status(400).send(error.details[0].message); // Return validation error if any

        const normalizedVisitorData = normalizeVisitor(req.body); // Normalize data to ensure defaults
        const visitor = await registerVisitor(normalizedVisitorData); // Register the new visitor
        res.status(201).send(visitor); // Return created visitor with 201 status
    } catch (error) {
        handleError(res, error.status || 400, error.message); // Handle validation errors
    }
});

// POST Zoo/visitors/login
router.post("/login", async (req, res) => {
    try {
        const { error } = validateLogin(req.body); // Validate incoming visitor data
        if (error) return res.status(400).send(error.details[0].message); // Return validation error if any

        const token = await loginVisitor(req.body.email || req.body.username, req.body.password); // Log in the visitor
        res.send(token); // Return the authentication token
    } catch (error) {
        handleError(res, error.status || 400, error.message); // Handle login errors
    }
});

// GET Zoo/visitors/:id 
router.get("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params; // ID being accessed
        const { _id, isAdmin } = req.visitor; // ID and admin status of the logged-in visitor

        // Check if the user is either accessing their own profile or is an admin
        if (_id.toString() !== id && !isAdmin) {
            return handleError(res, 403, "You are not authorized to view this profile.");
        }

        const visitor = await getVisitorById(id); // Fetch the visitor by ID
        res.send(visitor); // Send the visitor data
    } catch (error) {
        handleError(res, error.status || 500, error.message); // Handle unexpected errors
    }
});

// PUT Zoo/visitors/:id 
router.put("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params; // ID being updated
        const { _id, isAdmin } = req.visitor; // ID and admin status of the logged-in visitor

        // Check if the user is either updating their own profile or is an admin
        if (_id.toString() !== id && !isAdmin) {
            return handleError(res, 403, "You are not authorized to update this profile.");
        }

        const { error } = validateUpdateVisitor(req.body); // Validate incoming visitor data
        if (error) return res.status(400).send(error.details[0].message); // Return validation error if any

        const updatedVisitorData = normalizeVisitor(req.body); // Normalize data to ensure defaults
        const updatedVisitor = await updateVisitorProfile(id, updatedVisitorData); // Update visitor profile
        res.send(updatedVisitor); // Send updated visitor data
    } catch (error) {
        handleError(res, error.status || 500, error.message); // Handle unexpected errors
    }
});

// DELETE Zoo/visitors/:id 
router.delete("/:id", auth, async (req, res) => {
    try {
        // Check if the user is an admin
        if (!req.visitor.isAdmin) {
            return handleError(res, 403, "Only admins can delete visitors.");
        }
        const result = await deleteVisitor(req.params.id); // Attempt to delete visitor
        res.send(result); // Return success message
    } catch (error) {
        handleError(res, error.status || 500, error.message); // Handle unexpected errors
    }
});

// PATCH Zoo/visitors/:id/like 
router.patch("/:id/like", auth, async (req, res) => {
    try {
        const { id } = req.params; // ID of the visitor liking the animal
        const { membershipTier, isAdmin } = req.visitor; // Get visitor's membership tier and admin status
        const allowedTiers = ["Tier 2 - Lionheart", "Tier 3 - Jungle king/queen", "Tier 4 - Safari leader"];

        // Check if the visitor is allowed to like animals
        if (!isAdmin && !allowedTiers.includes(membershipTier)) {
            return handleError(res, 403, "You must be Tier 2 or above to like animals.");
        }

        const updatedVisitor = await toggleLikeAnimal(id, req.body.animalId); // Update liked animal for the visitor
        res.send(updatedVisitor); // Return updated visitor data
    } catch (error) {
        handleError(res, error.status || 500, error.message); // Handle unexpected errors
    }
});

// Export the router for use in other modules
module.exports = router;
