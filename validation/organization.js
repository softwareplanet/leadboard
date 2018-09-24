import isEmpty from "lodash.isempty";
import { isBlank } from "./validationUtils";

export function validateOrganizationCreation(data) {
  let errors = {};

  if (isBlank(data.name)) errors.name = "Name cannot be empty";
  if (!("custom" in data)) {
    errors.custom = "Custom must be present";
  } else {
    if (!Array.isArray(data.custom)) {
      errors.custom = "Custom must be an array";
    } else {
      if (!data.custom.every(customField => ("key" in customField) && ("value" in customField))) {
        errors.custom = "Custom field must contain key and value";
      }
    }
  }

  return {
    errors,
    hasErrors: !isEmpty(errors),
  };
}

export function validateOrganizationUpdate(data) {
  let errors = {};

  if ("name" in data && isEmpty(data.name)) errors.name = "Name cannot be empty";
  if ("custom" in data && typeof data.custom !== "object") {
    errors.custom = "Custom must be an array";
  }

  return {
    errors,
    hasErrors: !isEmpty(errors),
  };
}
