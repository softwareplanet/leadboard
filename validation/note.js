import isEmpty from "lodash.isempty";
import { isBlank, isValidModelId } from "./validationUtils";
import Note from "../models/note";

export const validateNotesGet = (model) => {
  let errors = {};
  const leadModel = "lead";
  const organizationModel = "organization";
  const contactModel = "contact";
  const models = [leadModel, organizationModel, contactModel];
  if (!models.includes(model)) {
    errors.model = "Bad model's type";
  }
  return {
    errors,
    hasErrors: !isEmpty(errors),
  };
};

export const validateNoteUpdate = (noteId, text) => {
  let errors = {};
  if (isBlank(text)) {
    errors.note = "Note cant be empty";
  }
  return {
    errors,
    hasErrors: !isEmpty(errors),
  };
};

export const validateNoteCreate = (text) => {
  let errors = {};
  if (isBlank(text)) {
    errors.note = "Note cant be empty";
  }
  return {
    errors,
    hasErrors: !isEmpty(errors),
  };
};

export const validateNoteDomainMiddleware = (req, res, next) => {
  if (isValidModelId(req.params.noteId)) {
    Note.findById(req.params.noteId)
      .populate({ path: "lead", populate: { path: "owner" } })
      .then(note => {
        if (note !== null && note.lead.owner.domain.equals(req.user.domain)) {
          next();
        } else {
          return res.status(404).json({ errors: { message: "Note with provided id is not found in your domain" } });
        }
      });
  } else {
    return res.status(404).json({ errors: { message: "Provided note's id is not valid" } });
  }
};
