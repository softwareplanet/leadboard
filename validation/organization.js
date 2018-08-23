import isEmpty from "lodash.isempty";

export function validateOrganizationCreation(data) {
  let errors = {};

  if (isEmpty(data.name)) errors.name = "Name cannot be empty";
  if (isEmpty(data.domain)) errors.domain = "Domain cannot be empty";
  if (!("custom" in data)) {
    errors.custom = "Custom must be present";
  } else {
    if (typeof data.custom !== "object") {
      errors.custom = "Custom must be an array";
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
  if ("domain" in data && isEmpty(data.domain)) errors.domain = "Domain cannot be empty";
  if ("custom" in data && typeof data.custom !== "object") {
    errors.custom = "Custom must be an array";
  }

  return {
    errors,
    hasErrors: !isEmpty(errors),
  };
}
