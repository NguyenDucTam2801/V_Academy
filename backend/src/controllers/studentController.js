//Get all students place
const db = require("../config/db");
const { StudentCreate, StudentList } = require("../models/studentModel");

const getAllStudents = async (req, res) => {
  try {

    StudentList.getAll((err, result) => {
      if (err) {
        return res.status(404).send({
          success: false,
          message: "No data found",
        });
      }
      console.log("Query succesfully executed", result);

      return res.status(200).send({
        success: true,
        message: "Students retrieved successfully",
        data: result,
      });
    });

    db.end(function () {
      console.log("Connection closed");
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

const createStudent = async (req, res) => {
  const studentData = {
    student_id: req.body.student_id,
    student_name: req.body.student_name,
    student_birth: req.body.student_birth,
    student_email: req.body.student_email,
    student_phone: req.body.student_phone,
    student_address: req.body.student_address,
    student_url: req.body.student_url,
    student_descript: req.body.student_descript,
  };

  // Call the model's create method
  StudentCreate.create(studentData, (err, result) => {
    try {
      if (err) {
        return res.status(500).send({
          success: false,
          message: "Error creating student",
          error: err,
        });
      }
      return res.status(201).send({
        success: true,
        message: "Student created successfully!",
        data: result,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        success: false,
        message: "Internal server error",
        error: err.message,
      });
    }
  });
};

module.exports = { getAllStudents, createStudent };
