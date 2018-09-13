import Validator from "validator";
import { flow, isEmpty, trim } from "lodash/fp";

export const isBlank = flow(
  trim,
  isEmpty,
);

export function isNumber(data) {
  return data && (typeof data === "number" || Validator.isNumeric(data));
}

export function isValidModelId(data) {
  const idRegexp = new RegExp("^[a-fA-F0-9]{24}$");
  return data && typeof data === "string" && idRegexp.test(data);
}

export function isValidTimezone(tz) {
  if (!Intl || !Intl.DateTimeFormat().resolvedOptions().timeZone) {
    throw "Time zones are not available in this environment";
  }

  try {
    Intl.DateTimeFormat(undefined, { timeZone: tz });
    return true;
  }
  catch (ex) {
    return false;
  }
}
