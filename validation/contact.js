import isEmpty from "lodash.isempty";

export function validateContactCreation(data) {
  let errors = {};

  if (isEmpty(data.name) && isEmpty(data.organization.name)) errors.contact = "Both name and organization cannot be empty at the same time";
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