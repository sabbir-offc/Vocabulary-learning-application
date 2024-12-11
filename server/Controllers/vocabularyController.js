const Vocabulary = require("../models/vocabularyModel");

// Create a new vocabulary entry
const createVocabulary = async (req, res) => {
  const { word, pronunciation, whenToSay, lessonNo, adminEmail } = req.body;

  if (!word || !pronunciation || !whenToSay || !lessonNo || !adminEmail) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newVocabulary = new Vocabulary({
      word,
      pronunciation,
      whenToSay,
      lessonNo,
      adminEmail,
    });

    await newVocabulary.save();

    res
      .status(201)
      .json({ message: "Vocabulary created successfully", newVocabulary });
  } catch (error) {
    console.error("Error creating vocabulary:", error);
    res.status(500).json({ message: "Error creating vocabulary", error });
  }
};

// Get all vocabularies with optional filtering by lessonNo
const getVocabularies = async (req, res) => {
  const { lessonNo } = req.query;

  try {
    let vocabularies = [];
    if (lessonNo) {
      vocabularies = await Vocabulary.find({ lessonNo });
    } else {
      vocabularies = await Vocabulary.find();
    }

    res.status(200).json(vocabularies);
  } catch (error) {
    console.error("Error fetching vocabularies:", error);
    res.status(500).json({ message: "Error fetching vocabularies", error });
  }
};

// Update a vocabulary entry
const updateVocabulary = async (req, res) => {
  const { id } = req.params;
  const { word, pronunciation, whenToSay, lessonNo } = req.body;

  try {
    const updatedVocabulary = await Vocabulary.findByIdAndUpdate(
      id,
      {
        word,
        pronunciation,
        whenToSay,
        lessonNo,
      },
      { new: true }
    );

    if (!updatedVocabulary) {
      return res.status(404).json({ message: "Vocabulary not found" });
    }

    res.status(200).json({
      message: "Vocabulary updated successfully",
      vocabulary: updatedVocabulary,
    });
  } catch (error) {
    console.error("Error updating vocabulary:", error);
    res.status(500).json({ message: "Error updating vocabulary", error });
  }
};

// Delete a vocabulary entry
const deleteVocabulary = async (req, res) => {
  const { id } = req.params; // `id` should come from the URL parameter

  if (!id) {
    return res.status(400).json({ message: "Vocabulary ID is required" });
  }

  try {
    // Attempt to delete the vocabulary by its ID
    const deletedVocabulary = await Vocabulary.findByIdAndDelete(id);

    if (!deletedVocabulary) {
      return res.status(404).json({ message: "Vocabulary not found" });
    }

    res.status(200).json({ message: "Vocabulary deleted successfully" });
  } catch (error) {
    console.error("Error deleting vocabulary:", error);
    res.status(500).json({ message: "Error deleting vocabulary", error });
  }
};


module.exports = {
  createVocabulary,
  getVocabularies,
  updateVocabulary,
  deleteVocabulary,
};
