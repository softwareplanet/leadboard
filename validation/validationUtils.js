import Validator from "validator";

export function isNumber(data) {
  return typeof data === "number" || Validator.isNumeric(data);
}
