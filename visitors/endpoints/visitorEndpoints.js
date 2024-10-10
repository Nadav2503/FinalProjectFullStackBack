const express = require("express");
const { handleError } = require("../../middlewares/errorHandler");
const auth = require("../../auth/authService");
const { getAllVisitors, registerVisitor } = require("../crud/visitorCrud");

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

module.exports = router;
