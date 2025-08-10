const mongoose = require("mongoose");
require("dotenv").config();

async function connectToDb() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to db");
    } catch (e) {
        console.error("Database connection failed:", e);
    }
}

module.exports = { connectToDb }; // must be object with connectToDb key
