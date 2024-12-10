const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware"); // Import JWT middleware
const {
  addTutorial,
  updateTutorial,
  deleteTutorial,
  getTutorials,
} = require("../controllers/tutorialController"); // Import the tutorial controller

// Example route for admin dashboard
router.get("/", verifyToken, (req, res) => {
  res.send("Admin route is protected and working!");
});

// Route to manage users (you can expand this for user management)
router.post("/manage-users", verifyToken, (req, res) => {
  // Logic for managing users (you can implement admin-specific user actions here)
  res.status(200).send("Users managed successfully");
});

// --- Tutorial Management ---
// Route to get all tutorials (protected, only for admin)
router.get("/tutorials", verifyToken, getTutorials);

// Route to add a tutorial (protected, only for admin)
router.post("/tutorials/add", verifyToken, addTutorial);

// Route to update a tutorial (protected, only for admin)
router.put("/tutorials/update/:id", verifyToken, updateTutorial);

// Route to delete a tutorial (protected, only for admin)
router.delete("/tutorials/delete/:id", verifyToken, deleteTutorial);

module.exports = router;
