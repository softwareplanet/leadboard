const Validator = require("validator");
const isEmpty = require("lodash.isempty");

module.exports = function validateFunnelInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";

  if (!Validator.isLength(data.name, { max: 30 })) {
    errors.name = "Funnel name cannot be more 30 characters";
  }

  return {
    errors,
    hasErrors: !isEmpty(errors)
  };
};
