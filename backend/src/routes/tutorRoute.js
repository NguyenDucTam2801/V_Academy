const express = require("express");
const tutorController = require("../controllers/tutorController");
const { verifyToken } = require("../middleware/authenticationRoute");

const router = express.Router();

// Tutor Routes
router.post("/signIn", tutorController.tutorSignIn);
router.put("/update", verifyToken, tutorController.tutorUpdate);
router.get("/info/:id", verifyToken, tutorController.tutorGetInfo);
router.get(
  "/tutorClass/:id",
  verifyToken,
  tutorController.getTutorClassController
);
router.get(
  "/tutorLessonClass/:class_id",
  verifyToken,
  tutorController.getTutorLessonClassController
);
router.get(
  "/tutorClassDetail/:class_id",
  verifyToken,
  tutorController.getTutorClassDetailController
);
router.get(
  "/tutorLessonDetail/:lesson_id",
  verifyToken,
  tutorController.getTutorLessonDetailController
);
// Route to add a new lesson
router.post("/lesson", tutorController.createLesson);
// Route to get the newest lesson
router.get("/lesson/latest", tutorController.getNewest);
// Route to add a lesson to a class
router.post("/lesson/class", tutorController.addLessonToClassController);

module.exports = router;
