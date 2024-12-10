const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const { connectDB } = require("./DB/db");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());



const authRoutes = require("./routes/auth");
const lessonRoutes = require("./routes/lesson");
const vocabRoutes = require("./routes/vocabulary");
const adminRoutes = require("./routes/admin");

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/vocabulary", vocabRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

// MongoDB connection and server start
connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
