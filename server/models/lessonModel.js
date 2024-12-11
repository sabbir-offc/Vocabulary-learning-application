const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    number: { type: Number, required: true, unique: true },
    vocabulary: [{ word: String, meaning: String, pronunciation: String }], // Array of vocabulary objects
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lesson", lessonSchema);
