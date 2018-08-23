import isEmpty from "lodash.isempty";

export function validateContactUpdate(data) {
  let errors = {};

  if (data.name && isEmpty(data.name)) errors.name = "Name cannot be empty";
  if (data.domain && isEmpty(data.domain)) errors.domain = "Domain cannot be empty";
  if (data.organization && isEmpty(data.organization)) errors.domain = "Organization cannot be empty";
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
    hasErrors: !isEmpty(errors),
  };
}
