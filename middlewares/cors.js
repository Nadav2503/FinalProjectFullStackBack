const cors = require("cors");

const corsMiddleWares = cors({
    origin: [
    ],
});

module.exports = corsMiddleWares;