import Validator from "validator";
import isEmpty from "lodash.isempty";
import { isNumber } from "./validationUtils";

export const validateLeadInput = (data) => {
  let errors = {};

  if (isEmpty(data.owner)) errors.owner = "Owner ID cannot be empty";
  if (isEmpty(data.stage)) errors.stage = "Stage ID cannot be empty";
  if (!data.contact && !data.organization) errors.contact = "Specify contact or organization";
  if (isEmpty(data.contact) && isEmpty(data.organization)) errors.contact = "Specify contact or organization";

  if (!isNumber(data.order)) {
    errors.order = "Order must be a number";
  }

  if (isEmpty(data.name)) {
    errors.name = "Name cannot be empty";
  } else {
    if (!Validator.isLength(data.name, { max: 30 })) {
      errors.name = "Lead name cannot be more 30 characters";
    }
  }

  return {
    errors,
    hasErrors: !isEmpty(errors),
  };
};

export const validateLeadUpdate = (data) => {
  let errors = {};

  if (data.owner && isEmpty(data.owner)) errors.owner = "Owner ID cannot be empty";
  if (data.stage && isEmpty(data.stage)) errors.stage = "Stage ID cannot be empty";
  if ("contact" in data && isEmpty(data.contact) && "organization" in data && isEmpty(data.organization)) {
    errors.contact = "Specify contact or organization";
  }
  if (data.order && !isNumber(data.order)) {
    errors.order = "Order must be a number";
  }
  if (data.name) {
    if (isEmpty(data.name)) {
      errors.name = "Name cannot be empty";
    } else {
      if (!Validator.isLength(data.name, { max: 30 })) {
        errors.name = "Lead name cannot be more 30 characters";
      }
    }
  }

  return {
    errors,
    hasErrors: !isEmpty(errors),
  };
};
