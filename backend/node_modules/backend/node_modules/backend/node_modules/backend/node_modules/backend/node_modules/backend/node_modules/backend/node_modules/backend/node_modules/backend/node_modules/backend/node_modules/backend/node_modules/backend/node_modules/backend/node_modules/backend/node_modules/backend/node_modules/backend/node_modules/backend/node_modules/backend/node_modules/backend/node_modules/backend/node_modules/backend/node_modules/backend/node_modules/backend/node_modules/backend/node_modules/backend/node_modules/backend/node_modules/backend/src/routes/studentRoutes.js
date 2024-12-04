const express = require("express");
const studentController = require("../controllers/studentController");
const { verifyToken } = require("../middleware/authenticationRoute");

const router = express.Router();

//get All students
// router.get("/getAllStudents", studentController.getAllStudents);
// router.post("/createStudent", studentController.createStudent);
router.post("/signIn", studentController.studentSignIn);
router.put("/update", verifyToken ,studentController.studentUpdate);
router.get("/info/:id", verifyToken, studentController.studentGetInfo);
router.get("/studentClass/:id", verifyToken, studentController.studentGetClass);
router.get("/studentLessonClass/:class_id", verifyToken, studentController.studentGetLessonClass);
router.get("/studentClassDetail/:class_id", verifyToken, studentController.studentGetClassDetail);
router.get("/studentLessonDetail/:lesson_id", verifyToken, studentController.studentGetLessonDetail);

module.exports = router;
