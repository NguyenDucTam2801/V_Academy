const express = require("express");
const admissionController = require("../controllers/admissionController");
const { verifyToken } = require("../middleware/authenticationRoute");

const router = express.Router();

// Admission Routes
router.post("/admissionSignIn", admissionController.admissionSignIn);
router.put("/admissionUpdate", verifyToken, admissionController.admissionUpdate);
router.get("/admissionInfo/:id", verifyToken, admissionController.admissionGetInfo);
router.get("/admissionApplications/:id", verifyToken, admissionController.admissionGetApplications);
router.get("/admissionApplicationDetail/:application_id", verifyToken, admissionController.admissionGetApplicationDetail);

module.exports = router;
