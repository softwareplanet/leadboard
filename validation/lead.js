import Validator from "validator";
import isEmpty from "lodash.isempty";
import { isNumber } from "./validationUtils";

module.exports = function validateLeadInput(data) {
  let errors = {};

  if (isEmpty(data.owner)) errors.owner = "Owner ID cannot be empty";
  if (isEmpty(data.stage)) errors.stage = "Stage ID cannot be empty";

  if (!isNumber(data.order)) errors.order = "Order must be a number";

  if (!Validator.isLength(data.name, { max: 30 })) {
    errors.name = "Lead name cannot be more 30 characters";
  }

  if (isEmpty("" + data.order)) errors.order = "Order cannot be empty";

  if (isEmpty("" + data.name)) errors.name = "Name cannot be empty";

  return {
    errors,
    hasErrors: !isEmpty(errors)
  };
};
