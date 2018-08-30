import Validator from "validator";
import isEmpty from "lodash.isempty";
import { isNumber } from "./validationUtils";
import { isEqual } from "lodash";

export const validateLeadInput = (data) => {
  let errors = {};

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

export const validateLeadUpdate = (data, previousLead, currentUser) => {
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

  if (!isEqual(previousLead.owner.domain, currentUser.domain)) {
    errors.domain = "You are trying to patch lead from other domain";
  }
  if (!previousLead.organization && "contact" in data && isEmpty(data.contact)) {
    errors.contact = "Specify contact or organization";
  }
  if (!previousLead.contact && "organization" in data && isEmpty(data.organization)) {
    errors.organization = "Specify contact or organization";
  }

  return {
    errors,
    hasErrors: !isEmpty(errors),
  };
};
