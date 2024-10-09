const express = require("express");
const animalRouter = require("../animals/routes/animalEndpoints"); // Update the path as necessary
const { handleError } = require("../utils/handleErrors"); // Import error handling utility

const router = express.Router();

// Use Zoo prefix for routes
router.use("/Zoo/animals", animalRouter);


// Handle 404 errors
router.use((req, res) => {
    return handleError(res, 404, "Path not found");
});

// Export the router to use in the main application
module.exports = router;
