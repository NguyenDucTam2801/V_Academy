const express = require("express");
const customerController = require("../controllers/customerController");

const router = express.Router();
router.post("/contact", customerController.validationCustomerRules,
  customerController.validateCustomer,
  customerController.addCustomerContact);

module.exports = router;
