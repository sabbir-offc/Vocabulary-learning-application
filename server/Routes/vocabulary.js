const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware"); // Use middleware to verify admin login
const {
  createVocabulary,
  getVocabularies,
  updateVocabulary,
  deleteVocabulary,
} = require("../controllers/vocabularyController");

// Routes for vocabulary management
router.post("/", verifyToken, createVocabulary); // Admin can create a new vocabulary
router.get("/", verifyToken, getVocabularies); // Admin can view all vocabularies
router.put("/:id", verifyToken, updateVocabulary); // Admin can update a vocabulary
router.delete("/:id", verifyToken, deleteVocabulary); // Admin can delete vocabulary

module.exports = router;
