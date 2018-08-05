const Validator = require("validator");
const isEmpty = require("lodash.isempty");

module.exports = function validateFunnelInput(data) {
  let errors = {};

  if (isEmpty(data.domain)) errors.domain = "Domain ID cannot be empty";

  data.name = !isEmpty(data.name) ? data.name : "";

  if (!Validator.isLength(data.name, { max: 30 })) {
    errors.name = "Stage name cannot be more 30 characters";
  }

  //TODO: Check if domain has a valid ID
  return {
    errors,
    hasErrors: !isEmpty(errors)
  };
};
