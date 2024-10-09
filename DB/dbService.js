const connectToLocalDb = require("./mongodb/connectToMongodbLocally");
const connectToAtlasDb = require("./mongodb/connectToAtlas");

const connectToDb = async () => {
    try {
        if (ENVIRONMENT === "development") {
            await connectToLocalDb();
        } else if (ENVIRONMENT === "production") {
            await connectToAtlasDb();
        }
    } catch (error) {
        console.error('Database connection error:', error);
    }
};

module.exports = connectToDb;
