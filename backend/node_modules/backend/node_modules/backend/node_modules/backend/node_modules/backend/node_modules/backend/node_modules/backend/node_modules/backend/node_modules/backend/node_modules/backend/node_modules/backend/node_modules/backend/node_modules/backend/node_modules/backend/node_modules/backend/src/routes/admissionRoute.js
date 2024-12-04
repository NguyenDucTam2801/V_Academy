const express = require("express");
const admissionController = require("../controllers/admissionController");
const { verifyToken } = require("../middleware/authenticationRoute");

const router = express.Router();

// Admission Routes
router.post("/signIn", admissionController.admissionSignIn);
router.put("/update/:id", verifyToken, admissionController.admissionUpdate);
router.get("/info/:id", verifyToken, admissionController.admissionGetInfo);
router.post("/createStudent", verifyToken, admissionController.createStudent);
router.post("/createTutor", verifyToken, admissionController.createTutor);
router.get("/courses", verifyToken, admissionController.getCourses);
router.post("/addClass", verifyToken, admissionController.createClass);
router.get("/studentList", verifyToken, admissionController.getStudentList);
router.get("/tutorList", verifyToken, admissionController.getTutorList);
router.get("/classList/:admission_id", verifyToken, admissionController.getClassList);
router.get("/customerContactList", verifyToken, admissionController.getCustomerContactList);
router.put("/changeCustomerContactStatus/:customer_id", verifyToken, admissionController.changeCustomerContactProcessStatus);

module.exports = router;
