import isEmpty from "lodash.isempty";
import { isBlank, isValidModelId } from "./validationUtils";

export const validateNoteUpdate = (noteId, text) => {
  let errors = {};
  if (isBlank(text)) {
    errors = "Note cant be empty";
  }
  if (!isValidModelId(noteId)) {
    errors = "Provided note's id is not valid";
  }
  return {
    errors,
    hasErrors: !isEmpty(errors),
  };
};

export const validateNoteCreate = (text) => {
  let errors = {};
  if (isBlank(text)) {
    errors = "Note can't be empty";
  }
  return {
    errors,
    hasErrors: !isEmpty(errors),
  };
};
