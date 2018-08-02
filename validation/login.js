const isEmpty = require("lodash.isempty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  if (isEmpty(data.email)) errors.email = "Email cannot be empty";
  if (isEmpty(data.password)) errors.password = "Password cannot be empty";

  return {
    errors,
    hasErrors: !isEmpty(errors)
  };
};
