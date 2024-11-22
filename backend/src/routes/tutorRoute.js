const express = require("express");
const tutorController = require("../controllers/tutorController");
const { verifyToken } = require("../middleware/authenticationRoute");

const router = express.Router();

// Tutor Routes
router.post("/tutorSignIn", tutorController.tutorSignIn);
router.put("/tutorUpdate", verifyToken, tutorController.tutorUpdate);
router.get("/tutorInfo/:id", verifyToken, tutorController.tutorGetInfo);
router.get("/tutorClass/:id", verifyToken, tutorController.tutorGetClass);
router.get("/tutorLessonClass/:class_id", verifyToken, tutorController.tutorGetLessonClass);
router.get("/tutorClassDetail/:class_id", verifyToken, tutorController.tutorGetClassDetail);
router.get("/tutorLessonDetail/:lesson_id", verifyToken, tutorController.tutorGetLessonDetail);

module.exports = router;
