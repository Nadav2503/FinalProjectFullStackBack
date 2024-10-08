const express = require("express");
const animalRouter = require("../animals/endpoints/animalEndpoints"); // Animal endpoints
const exhibitRouter = require("../exhibits/endpoints/exhibitEndpoints"); // Exhibit endpoints
const visitorRouter = require("../visitorss/endpoints/visitorEndpoints"); // Visitor endpoints
const { handleError } = require("../middlewares/errorHandler"); // Import error handling utility

const router = express.Router();

// Use Zoo prefix for routes
router.use("/animals", animalRouter);
router.use("/exhibits", exhibitRouter);
router.use("/visitors", visitorRouter);

// Handle 404 errors
router.use((req, res) => {
    return handleError(res, 404, "Path not found");
});

// Export the router to use in the main application
module.exports = router;
