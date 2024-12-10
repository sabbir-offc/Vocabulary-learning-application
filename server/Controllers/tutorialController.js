const { getDB } = require("../DB/db");

// Add a tutorial
async function addTutorial(req, res) {
  const { title, videoUrl } = req.body;
  try {
    const db = getDB();
    const result = await db
      .collection("tutorials")
      .insertOne({ title, videoUrl });
    res
      .status(201)
      .json({
        message: "Tutorial added successfully",
        tutorialId: result.insertedId,
      });
  } catch (error) {
    res.status(500).json({ message: "Error adding tutorial", error });
  }
}

// Update a tutorial
async function updateTutorial(req, res) {
  const { id } = req.params;
  const { title, videoUrl } = req.body;
  try {
    const db = getDB();
    await db
      .collection("tutorials")
      .updateOne(
        { _id: new require("mongodb").ObjectId(id) },
        { $set: { title, videoUrl } }
      );
    res.json({ message: "Tutorial updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating tutorial", error });
  }
}

// Delete a tutorial
async function deleteTutorial(req, res) {
  const { id } = req.params;
  try {
    const db = getDB();
    await db
      .collection("tutorials")
      .deleteOne({ _id: new require("mongodb").ObjectId(id) });
    res.json({ message: "Tutorial deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting tutorial", error });
  }
}

// Get all tutorials
async function getTutorials(req, res) {
  try {
    const db = getDB();
    const tutorials = await db.collection("tutorials").find().toArray();
    res.json(tutorials);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tutorials", error });
  }
}

module.exports = { addTutorial, updateTutorial, deleteTutorial, getTutorials };
