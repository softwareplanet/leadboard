import isEmpty from "lodash.isempty";

export function validateContactCreation(data) {
  let errors = {};

  if (isEmpty(data.name)) errors.name = "Name cannot be empty";
  if ("custom" in data && !Array.isArray(data.custom)) {
    errors.custom = "Custom must be an array";
  }

  return {
    errors,
    hasErrors: !isEmpty(errors),
  };
}

export function validateContactUpdate(data) {
  let errors = {};

  if (data.name && isEmpty(data.name)) errors.name = "Name cannot be empty";
  if (data.organization && isEmpty(data.organization)) errors.organization = "Organization cannot be empty";
  if ("custom" in data && !Array.isArray(data.custom)) {
    errors.custom = "Custom must be an array";
  }

  return {
    errors,
    hasErrors: !isEmpty(errors),
  };
}