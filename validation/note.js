import isEmpty from "lodash.isempty";
import { isBlank, isValidModelId } from "./validationUtils";
import Organization from "../models/organization";
import Contact from "../models/contact";
import Lead from "../models/lead";

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

export const validateOrganizationDomainMiddleware = (req, res, next) => {
  const note = req.body;
  if (note.organization) {
    if (isValidModelId(note.organization)) {
      Organization.findById(note.organization)
        .then(organization => {
          if (organization !== null && organization.domain.equals(req.user.domain)) {
            next();
          } else {
            return res.status(404).json({ errors: { message: "Organization with provided id is not found in your domain" } });
          }
        });
    } else {
      return res.status(404).json({ errors: { message: "Provided organization's id is not valid" } });
    }
  }else{
    next();
  }
};

export const validateLeadDomainMiddleware = (req, res, next) => {
  const note = req.body;
  if(note.lead) {
    if (isValidModelId(note.lead)) {
      Lead.findById(note.lead)
        .then(lead => {
          if (lead !== null && lead.domain.equals(req.user.domain)) {
            next();
          } else {
            return res.status(404).json({ errors: { message: "Lead with provided id is not found in your domain" } });
          }
        });
    } else {
      return res.status(404).json({ errors: { message: "Provided lead's id is not valid" } });
    }
  }else{
    next();
  }
};

export const validateContactDomainMiddleware = (req, res, next) => {
  const note = req.body;
  if(note.contact) {
    if (isValidModelId(note.contact)) {
      Contact.findById(note.contact)
        .then(contact => {
          if (contact !== null && contact.domain.equals(req.user.domain)) {
            next();
          } else {
            return res.status(404).json({ errors: { message: "Contact with provided id is not found in your domain" } });
          }
        });
    } else {
      return res.status(404).json({ errors: { message: "Provided contact's id is not valid" } });
    }
  }else{
    next();
  }
};