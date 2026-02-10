require("dotenv").config();

// Debug: Check if ejs exists
try {
    require('ejs');
    console.log('✅ EJS module found');
} catch (e) {
    console.error('❌ EJS module missing:', e.message);
}

const app = require("./app");

// Initialize database connection once (non-blocking for requests)
require("./startup/database")();

// Export the Express app for Vercel's Node serverless runtime
module.exports = app;
