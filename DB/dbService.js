const connectToMongodb = require("./mongodb/connectToMongodb");
const connectToAtlasDb = require("./mongodb/connectToAtlas");
const config = require("config");
const ENVIRONMENT = config.get("ENVIRONMENT");

const connectToDb = async () => {
    try {
        if (ENVIRONMENT === "development") {
            await connectToMongodb();
        } else if (ENVIRONMENT === "production") {
            await connectToAtlasDb();
        }
    } catch (error) {
        console.error('Database connection error:', error);
    }
};

module.exports = connectToDb;
