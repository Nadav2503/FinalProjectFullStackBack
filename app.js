// Import required modules
const express = require("express");  // Web framework for Node.js
require("dotenv").config();           // Load environment variables from .env file
const connectToMongodb = require("./DB/mongodb/connectToMongodb"); // Import the database connection function

// Create an instance of Express
const app = express();

// Define the port to listen on, defaulting to 8181
const PORT = process.env.PORT || 8181;

// Connect to the MongoDB database
connectToMongodb();


