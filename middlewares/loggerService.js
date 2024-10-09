const morgan = require("morgan");                      // Import Morgan for logging HTTP requests
const { currentTime } = require("../utils/timeHelper"); // Import currentTime utility function
const chalk = require("chalk");                        // Import Chalk for colored logging
const config = require("config"); // Import configuration
const logger = config.get("LOGGER"); // Get the logger setting from config

// Define a custom Morgan logger
const morganLogger = morgan(function (tokens, req, res) {
    const { year, month, day, hours, minutes, seconds, dayName } = currentTime(); // Get current time
    // Construct the log message
    let message = [
        `[${dayName}, ${year}/${month}/${day} ${hours}:${minutes}:${seconds}]`, // The string format
        tokens.method(req, res),                             // HTTP method
        tokens.url(req, res),                                // Request URL
        tokens.status(req, res),                             // Response status
        "-",
        tokens["response-time"](req, res),                  // Response time
        "ms",
    ].join(" ");                                          // Join all parts into a single string

    // Color the message based on the response status code
    if (res.statusCode >= 400) return chalk.redBright(message); // Error responses in red
    else return chalk.cyanBright(message);                   // Successful responses in cyan
});


const loggerMiddleware = () => {
    if (logger === "morgan") {
        return morganLogger;
    }
};
// Export the custom Morgan logger
module.exports = loggerMiddleware;
