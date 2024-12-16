const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const db = require("../config/db");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3001;

app.use(morgan("dev"));
app.use(express.json());
// Middleware to parse incoming requests with JSON payloads
app.use(bodyParser.json());

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
app.use("/api/students", require("../routes/studentRoutes"));
app.use("/api/students", require("../routes/admissionRoute"));
app.use("/api/students", require("../routes/tutorRoute"));

