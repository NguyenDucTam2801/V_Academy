const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const localtunnel = require("localtunnel");

const app = express();
const port = process.env.PORT || 3001;

app.use(morgan("dev"));
app.use(express.json());

// Use CORS middleware
const corsOptions = {
  origin: ['http://localhost:3000','https://v-academy-virid.vercel.app'], // Replace with your frontend URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));

// Middleware to parse incoming requests with JSON payloads
app.use(bodyParser.json());

//config .env
dotenv.config();

//test app
app.get("/", cors(), (req, res) => {
  return res.status(200).send("<p><b>Hello World</b></p>");
});

app.post("/", (req, res) => {
  return res.status(200).send("<p><b>Hello World</b></p>");
});
app.listen(port, () => {
  const serverUrl =
    process.env.RENDER_EXTERNAL_URL || `http://localhost:${port}`;
  console.log(`Server is running at ${serverUrl}`.bgMagenta.white);
});

//routes
app.use("/api/student", require("./src/routes/studentRoutes"));
app.use("/api/tutor", require("./src/routes/tutorRoute"));
app.use("/api/admission", require("./src/routes/admissionRoute"));
app.use("/api/customer", require("./src/routes/customerRoutes"));
