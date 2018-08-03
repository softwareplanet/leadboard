const Validator = require("validator");
const isEmpty = require("lodash.isempty");

export const validateStageInput = data => {
  let errors = {};

  if (isEmpty(data.domain)) errors.domain = "Domain ID cannot be empty";
  if (isEmpty(data.funnel)) errors.funnel = "Funnel ID cannot be empty";

  data.order = !isEmpty(data.order) ? data.order : "";
  data.name = !isEmpty(data.name) ? data.name : "";

  if (!Validator.isNumeric(data.order)) {
    errors.order = "Order must be a number";
  }

  if (!Validator.isLength(data.name, { max: 30 })) {
    errors.name = "Stage name cannot be more 30 characters";
  }

  //TODO: Check if domain and funnel are valid IDs

  return {
    errors,
    hasErrors: !isEmpty(errors)
  };
};

export const validateStageSearchInput = data => {
  let errors = {};

  if (isEmpty(data.domain)) errors.domain = "Domain ID cannot be empty";
  if (isEmpty(data.funnel)) errors.funnel = "Funnel ID cannot be empty";

  return {
    errors,
    hasErrors: !isEmpty(errors)
  };
};
