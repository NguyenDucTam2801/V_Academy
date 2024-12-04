const { body, validationResult } = require("express-validator");
const { contactCustomer } = require("../models/customerModel");

const db = require("../config/db");

const addCustomerContact = (req, res) => {
  const {
    customer_name,
    customer_email,
    customer_phone,
    customer_address,
    customer_birthday,
    customer_extra,
  } = req.body;

  try {
    const customer = {
      customer_name: customer_name,
      customer_email: customer_email,
      customer_phone: customer_phone,
      customer_address: customer_address,
      customer_birthday: customer_birthday,
      customer_extra: customer_extra,
    };
    contactCustomer(customer)
      .then((result) => {
        res.status(200).send({
          success: true,
          message: "[CustomerControlled]Customer contact created successfully",
          data: result,
        });
      })
      .catch((err) => {
        res.status(500).send({
          success: false,
          message: "Internal server error",
          error: err.message,
        });
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

const validationCustomerRules = [
  body("customer_name")
    .notEmpty()
    .withMessage("Customer name is required")
    .isLength({ max: 50 })
    .withMessage("Customer name must not exceed 50 characters"),
  body("customer_email").isEmail().withMessage("Valid email is required"),
  body("customer_phone")
    .isMobilePhone()
    .withMessage("Valid phone number is required"),
  body("customer_address")
    .notEmpty()
    .withMessage("Customer address is required"),
  body("customer_birthday")
    .isDate()
    //YY/MM/DD
    .withMessage("Valid date is required for birthday"),
  body("customer_extra")
    .optional()
    .isLength({ max: 200 })
    .withMessage("Extra information must not exceed 200 characters"),
];

const validateCustomer = (req, res, next) => {
  console.log("[customerController]validateCustomer");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  addCustomerContact,
  validationCustomerRules,
  validateCustomer,
};
