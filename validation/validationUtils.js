import Validator from "validator";

export function isNumber(data) {
  return typeof data === "number" || Validator.isNumeric(data);
}

export function isValidModelId(data) {
  const idRegexp = new RegExp("^[a-fA-F0-9]{24}$");
  return data && typeof data === "string" && !Validator.isEmpty(data) && idRegexp.test(data);
}
