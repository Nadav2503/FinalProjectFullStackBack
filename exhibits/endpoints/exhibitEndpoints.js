const express = require("express"); // Import Express framework

const { getAllExhibits } = require("../crud/exhibitCrud"); // Import CRUD operations for animals

const router = express.Router(); // Create an Express router

// GET Zoo/exhibits - Retrieve all exhibits
router.get("/", async (req, res) => {
    try {
        const exhibits = await getAllExhibits(); // Fetch all exhibits
        res.status(200).json(exhibits); // Return exhibits in response
    } catch (error) {
        handleError(res, error); // Handle any fetch errors
    }
});

module.exports = router;
