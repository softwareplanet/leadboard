import isEmpty from "lodash.isempty";
import { isValidTimezone } from "./validationUtils";

export const validateDomainSettingsUpdate = (data) => {
  let errors = {};

  if ("customFields" in data) {
    errors.customFields = "You have to use POST|PATCH|DELETE api/domain/:domainId/settings/customFields/:customFieldId to modify custom fields";
  }

  if ("timezone" in data) {
    if (!isValidTimezone(data.timezone)) {
      errors.timezone = "Timezone is not valid";
    }
  }

  return {
    errors,
    hasErrors: !isEmpty(errors),
  };
};

export const validateCustomFieldCreation = (data) => {
  let errors = {};

  if (data.isDefault) {
    errors.isDefault = "You cannot add custom fields with property default";
  }

  return {
    errors,
    hasErrors: !isEmpty(errors),
  };
};

export const validateCustomFieldUpdate = (data) => {
  let errors = {};

  if (data.isDefault) {
    errors.isDefault = "You cannot add custom fields with property default";
  }

  return {
    errors,
    hasErrors: !isEmpty(errors),
  };
};
