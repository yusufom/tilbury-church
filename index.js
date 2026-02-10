require("dotenv").config();

const app = require("./app");

// Initialize database connection (uses process.env.DB_String)
require("./startup/database")(app);

// Export the Express app for Vercel's Node serverless runtime
module.exports = app;
