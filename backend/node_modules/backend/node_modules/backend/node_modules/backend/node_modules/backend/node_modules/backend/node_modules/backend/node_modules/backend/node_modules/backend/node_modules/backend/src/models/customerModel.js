const db = require("../config/db");

const contactCustomer = (customer) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO customer_contact SET ?";
    db.query(sql, customer, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};


module.exports = {
  contactCustomer,
};
