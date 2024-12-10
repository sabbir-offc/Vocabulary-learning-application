const bcrypt = require("bcrypt");
const { getDB } = require("../DB/db");
const { ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const path = require("path");

async function registerUser(req, res) {
  const { name, email, password, image } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if the email already exists
    const db = getDB();
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the new user to the database with the image URL
    const result = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      image, // Save the image URL
      role: "User",
    });

    // Generate JWT token for the newly registered user
    const token = jwt.sign(
      { id: result.insertedId, role: "User" },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    // Send back the token and user info (including image URL)
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: { id: result.insertedId, name, email, image },
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
}

// Function to login the user
async function loginUser(req, res) {
  const { email, password } = req.body;
  try {
    // Check if the user exists
    const db = getDB();
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the entered password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token if credentials match
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "10d" } // 1 hour expiration
    );

    // Send response with the token and user data
    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
}

// Fetch user data
async function getUser(req, res) {
  try {
    // Ensure req.user is populated by the middleware
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.id; // Get user ID from token payload
    console.log("User ID:", userId); // Debugging

    const db = getDB();

    // Find user in the database by _id
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Exclude sensitive data like password before sending response
    const { password, ...userData } = user;

    res.status(200).json(userData); // Send user data
  } catch (error) {
    console.error("Error fetching user data:", error); // Debugging
    res.status(500).json({ message: "Error fetching user data", error });
  }
}

module.exports = { registerUser, loginUser, getUser };
