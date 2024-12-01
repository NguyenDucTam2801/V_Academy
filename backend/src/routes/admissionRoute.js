const express = require("express");
const admissionController = require("../controllers/admissionController");
const { verifyToken } = require("../middleware/authenticationRoute");

const router = express.Router();

// Admission Routes
router.post("/admissionSignIn", admissionController.admissionSignIn);
router.put("/admissionUpdate", verifyToken, admissionController.admissionUpdate);
router.get("/admissionInfo/:id", verifyToken, admissionController.admissionGetInfo);
router.post("/createStudent",verifyToken, admissionController.createStudent);
router.post("/createTutor",verifyToken, admissionController.createTutor);
router.post('/CreateTutorAccount',verifyToken, admissionController.createTutorAccount);
router.post('/CreateStudentAccount',verifyToken,admissionController.createStudentAccount);

module.exports = router;
