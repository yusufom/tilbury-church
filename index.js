require("dotenv").config();

const app = require("./app");

// Initialize database connection once (non-blocking for requests)
require("./startup/database")();

// Export the Express app for Vercel's Node serverless runtime
module.exports = app;
