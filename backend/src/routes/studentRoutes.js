const express = require("express");
const studentController = require("../controllers/studentController");

const router = express.Router();

//get All students
router.get("/getAllStudents", studentController.getAllStudents);
router.post("/createStudent", studentController.createStudent);

module.exports = router;
