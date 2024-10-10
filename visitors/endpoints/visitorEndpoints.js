const express = require("express");
const { handleError } = require("../../middlewares/errorHandler");
const auth = require("../../auth/authService");
const { getAllVisitors, registerVisitor, loginVisitor, getVisitorById } = require("../crud/visitorCrud");

const router = express.Router();

// GET Zoo/visitors - Admin only
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

// POST Zoo/visitors/register - Accessible to everyone
router.post("/register", async (req, res) => {
    try {
        const visitor = await registerVisitor(req.body);
        res.status(201).send(visitor);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});

// POST Zoo/visitors/login - Accessible to everyone
router.post("/login", async (req, res) => {
    try {
        const token = await loginVisitor(req.body.email || req.body.username, req.body.password);
        res.send(token);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});

// GET Zoo/visitors/:id - Only for the visitor or an admin
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

module.exports = router;
