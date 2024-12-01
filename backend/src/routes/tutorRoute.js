const express = require("express");
const tutorController = require("../controllers/tutorController");
const { verifyToken } = require("../middleware/authenticationRoute");

const router = express.Router();

// Tutor Routes
router.post("/tutorSignIn", tutorController.tutorSignIn);
router.put("/tutorUpdate", verifyToken, tutorController.tutorUpdate);
router.get("/tutorInfo/:id", verifyToken, tutorController.tutorGetInfo);
// router.get("/tutorClass/:id", verifyToken, tutorController.tutorGetClass);
router.get("/tutorLessonClass/:class_id", verifyToken, tutorController.tutorGetLessonClass);
router.get("/tutorClassDetail/:class_id", verifyToken, tutorController.tutorGetClassDetail);
router.get("/tutorLessonDetail/:lesson_id", verifyToken, tutorController.tutorGetLessonDetail);
// Route to add a new lesson
router.post('/lesson', tutorController.createLesson);
  // Route to get the newest lesson
router.get('/lesson/latest', tutorController.getNewest);
  // Route to add a lesson to a class
router.post('/lesson/class', tutorController.addLessonToClassController);

module.exports = router;
