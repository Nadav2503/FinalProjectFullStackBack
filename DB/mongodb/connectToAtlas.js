const mongoose = require("mongoose");

const connectionStringForAtlas = "";

const connectToAtlasDb = async () => {
    try {
        await mongoose.connect(connectionStringForAtlas);
        console.log("Connected to MongoDB in atlas");
    } catch (error) {
        console.error("Could not connect to MongoDB", error);
    }