const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");
const { getUser } = require("../controllers/userController");
const { verifyToken } = require("../middleware/authMiddleware"); // Middleware to verify JWT
const router = express.Router();

router.get("/me", verifyToken, getUser);
router.post("/login", loginUser);
router.post("/register", registerUser);

module.exports = router;
