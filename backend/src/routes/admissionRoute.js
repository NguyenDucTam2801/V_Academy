const express = require("express");
const admissionController = require("../controllers/admissionController");
const { verifyToken } = require("../middleware/authenticationRoute");

const router = express.Router();

// Admission Routes
router.post("/signIn", admissionController.admissionSignIn);
router.put("/update/:id", verifyToken, admissionController.admissionUpdate);
router.get("/info/:id", verifyToken, admissionController.admissionGetInfo);
router.post("/createStudent",verifyToken, admissionController.createStudent);
router.post("/createTutor",verifyToken, admissionController.createTutor);
router.get('/course/:courseId', admissionController.getCourseById);
router.post('/addClass', admissionController.addClass);

module.exports = router;
