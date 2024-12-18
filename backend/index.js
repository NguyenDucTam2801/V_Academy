const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3001;

// Load environment variables
dotenv.config();

// Middleware
app.use(morgan("dev"));
app.use(express.json()); // Parse JSON payloads

// Use CORS middleware globally
app.use(
  cors({
    origin: "https://v-academy.onrender.com", // Correct Render origin
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Allow HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow headers
    credentials: true, // Allow cookies/credentials
  })
);

// Test Routes
app.get("/", (req, res) => {
  res.status(200).send("<p><b>Hello World</b></p>");
});

app.post("/", (req, res) => {
  console.log("POST request received:", req.body);
  res.status(200).send("<p><b>Hello World</b></p>");
});

// Routes
app.use("/api/student", require("./src/routes/studentRoutes"));
app.use("/api/tutor", require("./src/routes/tutorRoute"));
app.use("/api/admission", require("./src/routes/admissionRoute"));
app.use("/api/customer", require("./src/routes/customerRoutes"));

// Start the server
app.listen(port, () => {
  const serverUrl = process.env.RENDER_EXTERNAL_URL || `http://localhost:${port}`;
  console.log(`Server is running at ${serverUrl}`.bgMagenta.white);
});
