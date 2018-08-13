const Validator = require("validator");
const isEmpty = require("lodash.isempty");

module.exports = function validateLeadInput(data) {
  let errors = {};

  if (isEmpty(data.owner)) errors.owner = "Owner ID cannot be empty";
  if (isEmpty(data.stage)) errors.stage = "Stage ID cannot be empty";

  console.log(typeof  data.order);
  if (typeof data.order !== "number") {
    errors.order = "Order must be a number";
  }

  if (isEmpty("" + data.order)) {
    errors.order = "Order cannot be empty";
  }

  if (isEmpty(data.name)) {
    errors.order = "Order cannot be empty";
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
