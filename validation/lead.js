import Validator from "validator";
import isEmpty from "lodash.isempty";
import { isBlank, isNumber } from "./validationUtils";
import { isEqual } from "lodash";

export const validateLeadInput = (data) => {
  let errors = {};

  if (isEmpty(data.stage)) errors.stage = "Stage ID cannot be empty";
  if ((!data.contact || isBlank(data.contact)) && (!data.organization || isBlank(data.organization))) {
    errors.contact = "Specify contact or organization";
  }

  if (!isNumber(data.order)) {
    errors.order = "Order must be a number";
  }

  if (!data.name || isBlank(...data.name)) {
    errors.name = "Name cannot be empty";
  } else {
    if (!Validator.isLength(data.name, { max: 30 })) {
      errors.name = "Lead's name cannot be longer than 30 characters";
    }
  }

  return {
    errors,
    hasErrors: !isEmpty(errors),
  };
};

export const validateLeadUpdate = (data, previousLead) => {
  let errors = {};

  if (data.owner && isBlank(data.owner)) errors.owner = "Owner ID cannot be empty";
  if (data.stage && isBlank(data.stage)) errors.stage = "Stage ID cannot be empty";
  if ("contact" in data && isBlank(data.contact) && "organization" in data && isBlank(data.organization)) {
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

  if (!previousLead.organization && "contact" in data && isBlank(data.contact)) {
    errors.contact = "Specify contact or organization";
  }
  if (!previousLead.contact && "organization" in data && isBlank(data.organization)) {
    errors.organization = "Specify contact or organization";
  }

  return {
    errors,
    hasErrors: !isEmpty(errors),
  };
};
