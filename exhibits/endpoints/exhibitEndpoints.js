const express = require("express"); // Import Express framework
const {
    getAllExhibits
} = require("../crud/exhibitCrud"); // Import CRUD operations for exhibits
const { handleError } = require("../../middlewares/errorHandler"); // Import error handling function

const router = express.Router(); // Create an Express router

// GET Zoo/exhibits - Retrieve all exhibits
router.get("/", async (req, res) => {
    try {
        const exhibits = await getAllExhibits(); // Fetch all exhibits
        res.status(200).send(exhibits); // Return exhibits with 200 status
    } catch (error) {
        handleError(res, error.status || 500, error.message); // Handle unexpected errors
    }
});

// Export the router for use in other modules
module.exports = router;
