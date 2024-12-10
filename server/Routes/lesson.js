const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const { verifyAdmin } = require("../middleware/roleMiddleware");
const router = express.Router();
const {
  addLesson,
  updateLesson,
  deleteLesson,
  getLessons,
} = require("../controllers/lessonController");

// Route to get all lessons (protected)
router.get("/", verifyToken, getLessons);

// Route to add a lesson (protected, only for admin)
router.post("/add", verifyToken, verifyAdmin, addLesson);

// Route to update a lesson (protected, only for admin)
router.put("/update/:id", verifyToken, updateLesson);

// Route to delete a lesson (protected, only for admin)
router.delete("/delete/:id", verifyToken, deleteLesson);

module.exports = router;
