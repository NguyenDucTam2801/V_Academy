const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const app = require("express")();
require("dotenv").config();

// Secret key for JWT token generation (from .env)
const JWT_SECRET = process.env.JWT_SECRET;

function createTokenStudent(user) {
  // Payload contains essential user data (id, role, name, etc.)
  const payload = {
    id: user.student_id,
    name: user.student_name,
    email: user.student_email,
    role: "student",
  };

  // Sign the token with an expiration time (1 hour in this case)
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
  return token;
}

function createTokenAdmission(user) {
  // Payload contains essential user data (id, role, name, etc.)
  const payload = {
    id: user.admission_id,
    name: user.admission_name,
    email: user.admission_email,
    role: "admission",
  };

  // Sign the token with an expiration time (1 hour in this case)
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
  return token;
}

function createTokenTutor(user) {
  // Payload contains essential user data (id, role, name, etc.)
  const payload = {
    id: user.tutor_id,
    name: user.tutor_name,
    email: user.tutor_email,
    role: "tutor",
  };

  // Sign the token with an expiration time (1 hour in this case)
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
  return token;
}

// Verify JWT Token
function verifyToken(req, res, next) {
  // Step 1: Get the token from the Authorization header
  const authHeader = req.headers["authorization"];

  // IF no auth headers are provided
  // THEN return 401 Unauthorized error
  if (!authHeader) {
    console.log("[StudentJWT]Auth headers is not found");
    return res.status(401).json({
      message:
        "[StudentJWT]Authentication credentials were missing or incorrect",
    });
  }

  // IF bearer auth header is not provided
  // THEN return 401 Unauthorized error
  if (!authHeader.startsWith("Bearer")) {
    console.log("[StudentJWT]Invalid auth mechanism");
    return res.status(401).json({
      message:
        "[StudentJWT]Authentication credentials were missing or incorrect",
    });
  }

  const token = authHeader.split(" ")[1];

  // IF bearer auth header is provided, but token is not provided
  // THEN return 401 Unauthorized error
  if (!token) {
    console.log(
      "[StudentJWT]Bearer token missing in the authorization headers."
    );
    return res.status(401).json({
      message:
        "[StudentJWT]Authentication credentials were missing or incorrect",
    });
  }

  // Step 3: Verify the token
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // Step 4: Attach the user data from the token to the request object
    req.user = decoded;

    // Continue to the next middleware or route handler
    next();
  } catch (err) {
    // Step 5: Handle invalid or expired token
    return res
      .status(400)
      .json({ message: "[StudentJWT]Invalid or expired token." });
  }
}

// Hash Password
async function hashPassword(password) {
  try {
    // Hash the password with a salt rounds of 10
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (err) {
    throw new Error("Error hashing password");
  }
}

// Compare Password with Hashed Password
async function comparePasswords(plainPassword, hashedPassword) {
  try {
    // Compare the plain password with the hashed password
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match;
  } catch (err) {
    throw new Error("Error comparing passwords");
  }
}

// Export the utility functions
module.exports = {
  createTokenAdmission,
  createTokenStudent,
  createTokenTutor,
  verifyToken,
  hashPassword,
  comparePasswords,
};
