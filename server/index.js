const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./DB/db"); // Correctly import the connectDB function

dotenv.config(); // Load environment variables from the .env file

const app = express();

app.use(cors()); // Enable cross-origin requests
app.use(express.json()); // Parse incoming JSON data

// Import routes
const authRoutes = require("./routes/auth");
const lessonRoutes = require("./routes/lesson");
const vocabRoutes = require("./routes/vocabulary");
const adminRoutes = require("./routes/admin");

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/vocabulary", vocabRoutes);
app.use("/api/admin", adminRoutes);

// Connect to the database
(async () => {
  await connectDB(); // Ensure the DB connection is established before the server starts
})();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
