const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME, // Ensure the correct database is used
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    mongoose.connection.on("connected", () => {
      console.log("Mongoose connected to the database.");
    });

    mongoose.connection.on("error", (err) => {
      console.error("Mongoose connection error:", err.message);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Mongoose disconnected.");
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit the process on failure
  }
};

module.exports = { connectDB };
