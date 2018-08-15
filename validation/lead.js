import Validator from "validator";
import isEmpty from "lodash.isempty";

function isNumber(data) {
  return typeof data === "number" || Validator.isNumeric(data);
}

module.exports = function validateLeadInput(data) {
  let errors = {};

  if (isEmpty(data.owner)) errors.owner = "Owner ID cannot be empty";
  if (isEmpty(data.stage)) errors.stage = "Stage ID cannot be empty";

  if (!isNumber(data.order)) {
    errors.order = "Order must be a number";
  }

  if (isEmpty("" + data.order)) {
    errors.order = "Order cannot be empty";
  }

  if (isEmpty(data.name)) {
    errors.name = "Name cannot be empty";
  } else {
    if (!Validator.isLength(data.name, { max: 30 })) {
      errors.name = "Lead name cannot be more 30 characters";
    }
  }

  //TODO: Check if owner, domain and stage are valid IDs
  return {
    errors,
    hasErrors: !isEmpty(errors)
  };
};
