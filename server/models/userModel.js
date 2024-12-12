const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Ensure email is unique
  password: { type: String, required: true },
  image: { type: String },
  role: { type: String, default: "User" },
});

module.exports = mongoose.model("User", userSchema);
