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
router.get("/course", verifyToken, admissionController.getCourses);
router.get("/subject", verifyToken, admissionController.getSubject);
router.post("/addClass", verifyToken, admissionController.createClass);
router.get("/studentList", verifyToken, admissionController.getStudentList);
router.get("/tutorList", verifyToken, admissionController.getTutorList);
router.get(
  "/admissionClass/:admission_id",
  verifyToken,
  admissionController.getClassList
);
router.get(
  "/customerContactList",
  verifyToken,
  admissionController.getCustomerContactList
);
router.put(
  "/changeCustomerContactStatus/:customer_id",
  verifyToken,
  admissionController.changeCustomerContactProcessStatus
);
router.get(
  "/admissionClassDetail/:class_id",
  verifyToken,
  admissionController.getClassDetail
);
router.get(
  "/admissionLessonDetail/:lesson_id",
  verifyToken,
  admissionController.getLessonDetail
);
router.get(
  "/admissionLessonClass/:class_id",
  verifyToken,
  admissionController.getLessonClass
);
router.delete(
  "/deleteCustomerInfo/:customer_id",
  verifyToken,
  admissionController.deleteCustomerInfo
);
router.put("/changePassword/:id",verifyToken,admissionController.changePasswordUser)
router.get("/getTutorWithSubject/:subject_id",verifyToken,admissionController.getTutorWithSubject)
module.exports = router;
