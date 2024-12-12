const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");
const { getUser } = require("../controllers/userController");
const { verifyToken } = require("../middleware/authMiddleware"); // JWT verification middleware

const router = express.Router();

// Routes for handling user authentication and registration
router.get("/me", verifyToken, getUser); // Protected route to get user data
router.post("/login", loginUser); // Login user
router.post("/register", registerUser); // Register user

module.exports = router;
