const jwt = require("jsonwebtoken");

// Middleware to protect routes
function verifyToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1]; // Get token from "Authorization" header

  if (!token) {
    return res
      .status(403)
      .json({ message: "No token provided, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token with JWT_SECRET
    req.user = decoded; // Add decoded user info to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
}

module.exports = { verifyToken };
