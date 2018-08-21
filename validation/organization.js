import isEmpty from "lodash.isempty";

export function validateOrganizationInput(data) {
  let errors = {};

  if (isEmpty(data.name)) errors.name = "Name cannot be empty";
  if (isEmpty(data.domain)) errors.domain = "Domain cannot be empty";
  if (data.custom && data.custom.length > 0) {
    errors.custom = [];
    for (let customField of data.custom) {
      if (isEmpty(customField.value)) {
        errors.custom[customField.name] = `${customField.name} cannot be empty`;
      }
    }
    if (errors.custom.length === 0) {
      errors.remove("custom");
    }
  }

  return {
    errors,
    hasErrors: !isEmpty(errors)
  };
}

export function validateOrganizationUpdate(data) {
  let errors = {};

  if (data.name && isEmpty(data.name)) errors.name = "Name cannot be empty";
  if (data.domain && isEmpty(data.domain)) errors.domain = "Domain cannot be empty";
  if (data.custom && data.custom.length > 0) {
    errors.custom = [];
    for (let customField of data.custom) {
      if (isEmpty(customField.value)) {
        errors.custom[customField.name] = `${customField.name} cannot be empty`;
      }
    }
    if (errors.custom.length === 0) {
      delete errors.custom;
    }
  }

  return {
    errors,
    hasErrors: !isEmpty(errors)
  };
}
