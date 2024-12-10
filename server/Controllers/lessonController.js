const { getDB } = require("../DB/db");

// Add a lesson
async function addLesson(req, res) {
  const { name, lessonNumber } = req.body;
  try {
    const db = getDB();
    const result = await db
      .collection("lessons")
      .insertOne({ name, lessonNumber });
    res
      .status(201)
      .json({
        message: "Lesson added successfully",
        lessonId: result.insertedId,
      });
  } catch (error) {
    res.status(500).json({ message: "Error adding lesson", error });
  }
}

// Update a lesson
async function updateLesson(req, res) {
  const { id } = req.params;
  const { name, lessonNumber } = req.body;
  try {
    const db = getDB();
    const result = await db
      .collection("lessons")
      .updateOne(
        { _id: new require("mongodb").ObjectId(id) },
        { $set: { name, lessonNumber } }
      );
    res.json({ message: "Lesson updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating lesson", error });
  }
}

// Delete a lesson
async function deleteLesson(req, res) {
  const { id } = req.params;
  try {
    const db = getDB();
    await db
      .collection("lessons")
      .deleteOne({ _id: new require("mongodb").ObjectId(id) });
    res.json({ message: "Lesson deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting lesson", error });
  }
}

// Get all lessons
async function getLessons(req, res) {
  try {
    const db = getDB();
    const lessons = await db.collection("lessons").find().toArray();
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ message: "Error fetching lessons", error });
  }
}

module.exports = { addLesson, updateLesson, deleteLesson, getLessons };
