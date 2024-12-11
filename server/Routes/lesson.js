const express = require("express");
const {
  createLesson,
  getLessons,
  updateLesson,
  deleteLesson,
} = require("../controllers/lessonController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

// Create a Lesson
router.post("/", verifyToken, createLesson);

// View All Lessons
router.get("/", verifyToken, getLessons);

// Update/Edit a Lesson
router.put("/:id", verifyToken, updateLesson);

// Delete a Lesson
router.delete("/:id", verifyToken, deleteLesson);

module.exports = router;
