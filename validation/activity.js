import Validator from "validator";
import isEmpty from "lodash.isempty";
import { isNumber } from "./validationUtils";

module.exports = function validateActivityInput(data) {
  let errors = {};

  if (isEmpty(data.type)) errors.type = "Type cannot be empty";
  if (isEmpty(data.subject)) errors.subject = "subject cannot be empty";

  if (data.duration && !isNumber(data.duration)) errors.duration = "Duration must be a number";

  return {
    errors,
    hasErrors: !isEmpty(errors)
  };
};
