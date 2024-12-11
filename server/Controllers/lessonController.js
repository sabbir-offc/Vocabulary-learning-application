const Lesson = require("../models/lessonModel");

// Create a new lesson
const createLesson = async (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res
      .status(400)
      .json({ message: "Lesson name and number are required" });
  }

  try {
    const lesson = new Lesson({ name, number, vocabulary: [] });
    await lesson.save();
    res.status(201).json(lesson);
  } catch (error) {
    res.status(500).json({ message: "Error creating lesson", error });
  }
};

// View all lessons
const getLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find().sort({ number: 1 });
    const lessonsWithCount = lessons.map((lesson) => ({
      id: lesson._id,
      name: lesson.name,
      number: lesson.number,
      vocabularyCount: lesson.vocabulary.length,
    }));
    res.status(200).json(lessonsWithCount);
  } catch (error) {
    console.error("Error fetching lessons:", error); // Log the error
    res.status(500).json({ message: "Error fetching lessons", error });
  }
};

// Update a lesson
const updateLesson = async (req, res) => {
  const { id } = req.params;
  const { name, number } = req.body;

  if (!name || !number) {
    return res
      .status(400)
      .json({ message: "Lesson name and number are required" });
  }

  try {
    const updatedLesson = await Lesson.findByIdAndUpdate(
      id,
      { name, number },
      { new: true }
    );
    if (!updatedLesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }
    res.status(200).json(updatedLesson);
  } catch (error) {
    res.status(500).json({ message: "Error updating lesson", error });
  }
};

// Delete a lesson
const deleteLesson = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedLesson = await Lesson.findByIdAndDelete(id);
    if (!deletedLesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }
    res.status(200).json({ message: "Lesson deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting lesson", error });
  }
};

module.exports = { createLesson, getLessons, updateLesson, deleteLesson };
