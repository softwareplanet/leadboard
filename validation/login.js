import isEmpty from "lodash.isempty";
import Validator from "validator";
module.exports = function validateLoginInput(data) {
  let errors = {};
  if (!Validator.isEmail(data.email)) errors.email = 'Email is invalid';

  if (isEmpty(data.email.trim())) errors.email = "Email cannot be empty";
  if (isEmpty(data.password.trim())) errors.password = "Password cannot be empty";

  return {
    errors,
    hasErrors: !isEmpty(errors)
  };
};
