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

  if (isEmpty(data.name)) {
    errors.name = "You cannot add custom fields with empty name";
  }

  return {
    errors,
    hasErrors: !isEmpty(errors),
  };
};

export const validateCustomFieldUpdate = (data, previousSettings) => {
  let errors = {};

  if (previousSettings.isDefault) {
    errors.isDefault = "You cannot patch default fields";
  } else {
    if ("isDefault" in data && data.isDefault) {
      errors.isDefault = "You cannot make a custom field default";
    }
  }

  if ("name" in data && isEmpty(data.name)) {
    errors.name = "You cannot update custom fields with empty name";
  }

  return {
    errors,
    hasErrors: !isEmpty(errors),
  };
};
