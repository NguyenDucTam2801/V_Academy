const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3001;

app.use(morgan("dev"));
app.use(express.json());
// Middleware to parse incoming requests with JSON payloads
app.use(bodyParser.json());

// Use CORS middleware
app.use(cors());

//config .env
dotenv.config();

//test app
app.get("/", (req, res) => {
  return res.status(200).send("<p><b>Hello World</b></p>");
});

app.post("/", (req, res) => {
  return res.status(200).send("<p><b>Hello World</b></p>");
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`.bgMagenta.white);
});

//routes
app.use("/api/student", require("./src/routes/studentRoutes"));
app.use("/api/tutor", require("./src/routes/tutorRoute"));
app.use("/api/admission", require("./src/routes/admissionRoute"));
app.use("/api/customer", require("./src/routes/customerRoutes"));
