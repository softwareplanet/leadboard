import isEmpty from "lodash.isempty";

export const validateDomainSettingsUpdate = () => {
  let errors = {};

  return {
    errors,
    hasErrors: !isEmpty(errors),
  };
};
