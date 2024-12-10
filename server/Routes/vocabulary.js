const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const router = express.Router();
const {
  addVocabulary,
  updateVocabulary,
  deleteVocabulary,
  getVocabularies,
} = require("../controllers/vocabController");

// Route to get all vocabularies (protected)
router.get("/", verifyToken, getVocabularies);

// Route to add a vocabulary (protected, only for admin)
router.post("/add", verifyToken, addVocabulary);

// Route to update a vocabulary (protected, only for admin)
router.put("/update/:id", verifyToken, updateVocabulary);

// Route to delete a vocabulary (protected, only for admin)
router.delete("/delete/:id", verifyToken, deleteVocabulary);

module.exports = router;
