const bcrypt = require("bcrypt");
const { getDB } = require("../DB/db");
const jwt = require("jsonwebtoken");

// Function to register a new user
async function registerUser(req, res) {
  const { name, email, password } = req.body;
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store the user in the database
    const db = getDB();
    const result = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      role: "User", // Default role as User, can be changed later
    });

    res.status(201).json({
      message: "User registered successfully",
      userId: result.insertedId,
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
}

// Function to login the user
async function loginUser(req, res) {
  const { email, password } = req.body;
  try {
    const db = getDB();
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET, // Set your JWT secret in the .env file
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
}

module.exports = { registerUser, loginUser };
