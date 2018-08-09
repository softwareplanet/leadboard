const isEmpty = require("lodash.isempty");
const Validator = require("validator")
module.exports = function validateLoginInput(data) {
  let errors = {};

  if (isEmpty(data.email)) errors.email = "Email cannot be empty";
  if (isEmpty(data.password)) errors.password = "Password cannot be empty";
  if (!Validator.isEmail(data.email)) errors.email = 'Email is invalid';

  return {
    errors,
    hasErrors: !isEmpty(errors)
  };
};
