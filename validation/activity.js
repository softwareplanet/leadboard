import { isBlank, isNumber, isValidModelId } from "./validationUtils";
import { isEmpty } from "lodash";
import Contact from "../models/contact";
import Lead from "../models/lead";
import Organization from "../models/organization";
import User from "../models/user";

export const validateActivityInput = data => {
  let errors = {};

  if (isBlank(data.type)) errors.type = "Type cannot be empty";
  if (isBlank(data.subject)) errors.subject = "Subject cannot be empty";

  if (data.duration && !isNumber(data.duration)) errors.duration = "Duration must be a number and cannot be empty";
  if (data.duration >= 480) errors.duration = "Duration must be less than 8 hours";

  return {
    errors,
    hasErrors: !isEmpty(errors),
  };
};

export const validateActivityUpdate = async (data, domain) => {
  let errors = {};

  if ("type" in data && isBlank(data.type)) errors.type = "Type cannot be empty";
  if ("subject" in data && isBlank(data.subject)) errors.subject = "Subject cannot be empty";

  if ("duration" in data) {
    if (data.duration && !isNumber(data.duration)) {
      errors.duration = "Duration must be a number and cannot be empty";
    } else {
      if (data.duration >= 480) errors.duration = "Duration must be less than 8 hours";
    }
  }

  if ("participants" in data) {
    let participantsErrors = [];
    for (let contact of data.participants) {
      let participantNumber = data.participants.indexOf(contact + 1);
      if (!isValidModelId(data.contact)) {
        participantsErrors.push(`Participant #${participantNumber} must be a valid object id`);
      } else {
        const contact = await Contact.findById(data.contact);
        if (!contact) {
          participantsErrors.push(`Participant #${participantNumber} does not exist`);
        } else {
          if (contact.domain !== domain)
            participantsErrors.push(`Participant #${participantNumber} does not belong to your domain`);
        }
      }
    }
    if (!isEmpty(participantsErrors)) errors.participants = participantsErrors;
  }

  if ("organization" in data) {
    if (!isValidModelId(data.organization)) {
      errors.organization = "Organization must be a valid object id";
    } else {
      const organization = await Organization.findById(data.organization);
      if (!organization) {
        errors.organization = "Organization does not exist";
      } else {
        if (organization.domain !== domain)
          errors.organization = "Organization does not belong to your domain";
      }
    }
  }

  if ("assignedTo" in data) {
    if (!isValidModelId(data.organization)) {
      errors.assignedTo = "Assigned to must be a valid object id";
    } else {
      const assignedTo = await User.findById(data.assignedTo);
      if (!assignedTo) {
        errors.assignedTo = "User does not exist";
      } else {
        if (assignedTo.domain !== domain)
          errors.assignedTo = "Assigned user does not belong to your domain";
      }
    }
  }

  if ("lead" in data) {
    if (!isValidModelId(data.organization)) {
      errors.lead = "Lead to must be a valid object id";
    } else {
      const lead = await Lead.findById(data.lead).populate("owner");
      if (!lead) {
        errors.lead = "Lead does not exist";
      } else {
        if (lead.owner.domain !== domain)
          errors.lead = "Lead does not belong to your domain";
      }
    }
  }

  if ("createdBy" in data) {
    const creator = await User.findById(data.assignedTo);
    if (data.createdBy !== creator._id) errors.createdBy = "Activity creator could not be changed";
  }


  return {
    errors,
    hasErrors: !isEmpty(errors),
  };
};

