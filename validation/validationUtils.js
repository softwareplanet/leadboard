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
  return data && typeof data === "string" && !Validator.isEmpty(data) && idRegexp.test(data);
}
