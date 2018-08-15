import isEmpty from "lodash.isempty";

module.exports = function validateOrganizationInput(data) {
  let errors = {};

  if (isEmpty(data.name)) errors.name = "Name cannot be empty";
  if (isEmpty(data.domain)) errors.domain = "Domain cannot be empty";

  return {
    errors,
    hasErrors: !isEmpty(errors)
  };
};
