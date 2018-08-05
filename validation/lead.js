const Validator = require("validator");
const isEmpty = require("lodash.isempty");

module.exports = function validateLeadInput(data) {
  let errors = {};

  if (isEmpty(data.owner)) errors.owner = "Owner ID cannot be empty";
  if (isEmpty(data.stage)) errors.stage = "Stage ID cannot be empty";

  data.order = !isEmpty(data.order) ? data.order : "";
  data.name = !isEmpty(data.name) ? data.name : "";

  if (!Validator.isNumeric(data.order)) {
    errors.order = "Order must be a number";
  }

  if (!Validator.isLength(data.name, { max: 30 })) {
    errors.name = "Lead name cannot be more 30 characters";
  }

  //TODO: Check if owner, domain and stage are valid IDs
  return {
    errors,
    hasErrors: !isEmpty(errors)
  };
};
