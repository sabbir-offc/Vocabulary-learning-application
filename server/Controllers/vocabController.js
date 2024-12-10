const { getDB } = require("../DB/db");

// Add a vocabulary
async function addVocabulary(req, res) {
  const { word, pronunciation, meaning, lessonId } = req.body;
  try {
    const db = getDB();
    const result = await db
      .collection("vocabulary")
      .insertOne({ word, pronunciation, meaning, lessonId });
    res
      .status(201)
      .json({
        message: "Vocabulary added successfully",
        vocabId: result.insertedId,
      });
  } catch (error) {
    res.status(500).json({ message: "Error adding vocabulary", error });
  }
}

// Update a vocabulary
async function updateVocabulary(req, res) {
  const { id } = req.params;
  const { word, pronunciation, meaning, lessonId } = req.body;
  try {
    const db = getDB();
    const result = await db
      .collection("vocabulary")
      .updateOne(
        { _id: new require("mongodb").ObjectId(id) },
        { $set: { word, pronunciation, meaning, lessonId } }
      );
    res.json({ message: "Vocabulary updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating vocabulary", error });
  }
}

// Delete a vocabulary
async function deleteVocabulary(req, res) {
  const { id } = req.params;
  try {
    const db = getDB();
    await db
      .collection("vocabulary")
      .deleteOne({ _id: new require("mongodb").ObjectId(id) });
    res.json({ message: "Vocabulary deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting vocabulary", error });
  }
}

// Get all vocabularies
async function getVocabularies(req, res) {
  try {
    const db = getDB();
    const vocabularies = await db.collection("vocabulary").find().toArray();
    res.json(vocabularies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching vocabularies", error });
  }
}

module.exports = {
  addVocabulary,
  updateVocabulary,
  deleteVocabulary,
  getVocabularies,
};
