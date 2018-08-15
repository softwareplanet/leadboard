import Validator from "validator";
import isEmpty from "lodash.isempty";
import { isNumber } from "./validationUtils";

export const validateStageInput = data => {
  let errors = {};

  if (isEmpty(data.funnel)) errors.funnel = "Funnel ID cannot be empty";

  if (!isNumber(data.order)) errors.order = "Order must be a number";

  if (isEmpty("" + data.order)) errors.order = "Order cannot be empty";

  if (!Validator.isLength(data.name, { max: 30 })) {
    errors.name = "Stage name cannot be more 30 characters";
  }

  if (isEmpty("" + data.name)) errors.name = "Name cannot be empty";

  return {
    errors,
    hasErrors: !isEmpty(errors)
  };
};

export const validateStageSearchInput = data => {
  let errors = {};

  return {
    errors,
    hasErrors: !isEmpty(errors)
  };
};
