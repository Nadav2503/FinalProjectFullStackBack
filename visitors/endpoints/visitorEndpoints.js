const express = require("express");
const { handleError } = require("../../middlewares/errorHandler");
const auth = require("../../auth/authService");
const { getAllVisitors, registerVisitor, loginVisitor, getVisitorById } = require("../crud/visitorCrud");

const router = express.Router();

// GET Zoo/visitors 
router.get("/", auth, async (req, res) => {
    try {
        if (!req.visitor.isAdmin) {
            return handleError(res, 403, "Only admins can view all visitors.");
        }
        const visitors = await getAllVisitors();
        res.status(200).send(visitors);
    } catch (error) {
        handleError(res, error.status || 500, error.message);
    }
});

// POST Zoo/visitors/register 
router.post("/register", async (req, res) => {
    try {
        const visitor = await registerVisitor(req.body);
        res.status(201).send(visitor);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});

// POST Zoo/visitors/login 
router.post("/login", async (req, res) => {
    try {
        const token = await loginVisitor(req.body.email || req.body.username, req.body.password);
        res.send(token);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
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
        handleError(res, error.status || 500, error.message);
    }
});

// PUT Zoo/visitors/:id 
router.put("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params; // ID being updated
        const { _id, isAdmin } = req.visitor; // Destructure ID and admin status of the logged-in visitor

        // Check if the user is either updating their own profile or is an admin
        if (_id.toString() !== id && !isAdmin) {
            return handleError(res, 403, "You are not authorized to update this profile.");
        }

        const updatedVisitor = await updateVisitor(id, req.body); // Update visitor profile
        res.send(updatedVisitor); // Send updated visitor data
    } catch (error) {
        handleError(res, error.status || 500, error.message);
    }
});

// DELETE Zoo/visitors/:id 
router.delete("/:id", auth, async (req, res) => {
    try {
        if (!req.visitor.isAdmin) {
            return handleError(res, 403, "Only admins can delete visitors.");
        }
        const result = await deleteVisitor(req.params.id);
        res.send(result);
    } catch (error) {
        handleError(res, error.status || 500, error.message);
    }
});

module.exports = router;
