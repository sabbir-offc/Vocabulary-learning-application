const multer = require("multer");
const path = require("path");

// Set up storage for images (in an 'uploads' folder)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Save files in the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Use a timestamp as the file name to avoid collisions
  },
});

const fileFilter = (req, file, cb) => {
  // Check if the file is an image and has one of the allowed extensions
  const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg"];

  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(
      new Error("Invalid file type. Only JPEG, PNG, and JPG are allowed"),
      false
    ); // Reject the file
  }
};

// Use multer to handle file uploads
const upload = multer({
  storage: storage,
  fileFilter: fileFilter, // Apply file type validation
});

module.exports = upload;
