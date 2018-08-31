import { Router } from "express";
import mongoose from "mongoose";

import validateLeadInput from "../../validation/lead";
import isEmpty from "lodash.isempty";
import { isEqual } from "lodash";
import { isValidModelId } from "../../validation/validationUtils";
import Lead from "../../models/lead";
import Contact from "../../models/contact";
import Organization from "../../models/organization";

const router = new Router();

const assertLeadIdParam = (req, res, next) => {
  if (process.env.ENV !== "PROD" && req.params.id) {
    return res.status(500).json({ 
      errors: { message: "You should use :leadId instead of :id in API request handlers" }
    })
  } 
  next();
}

const validateLeadDomain = (req, res, next) => {
  if (isValidModelId(req.params.leadId)) {
    Lead.findById(req.params.leadId)
      .populate("owner")
      .then(lead => {
        if (lead !== null && lead.owner.domain.equals(req.user.domain)){
          next()
        } else {
          return res.status(404).json({ errors: { message: "Lead with provided id is not found in your domain" }})
        }
      })
  } else {
    return res.status(404).json({ errors: { message: "Provided lead's id is not valid" }})
  }
}

const leadMembersMiddlewares = [assertLeadIdParam, validateLeadDomain]

// @route   GET api/lead
// @desc    Find sorted leads by domain and stage IDs
// @access  Private
router.get("/", (req, res) => {
  Lead.find({ stage: req.query.stage })
    .populate([{ path: "contact" }, { path: "organization" }])
    .sort({ order: "asc" })
    .then(leads => {
      res.json(leads);
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});

// @route   POST api/lead
// @desc    Create lead
// @access  Private
router.post("/", async (req, res) => {
  const { hasErrors, errors } = validateLeadInput(req.body);
  if (hasErrors) return res.status(400).json({ errors });

  let organization = req.body.organization;
  let contact = req.body.contact;

  let newLead = {
    _id: new mongoose.Types.ObjectId(),
    owner: req.body.owner,
    stage: req.body.stage,
    name: req.body.name,
    order: req.body.order,
  };

  if (!isEmpty(organization)) {
    if (!isValidModelId(organization)) {
      organization = await Organization.create({
        _id: new mongoose.Types.ObjectId(),
        name: organization,
        domain: req.user.domain,
      });
    } else {
      const existingOrganization = await Organization.findById(organization);
      if (!existingOrganization) {
        return res.status(400).json({ errors: { organization: "Organization does not exist" } });
      }
      if (!isEqual(existingOrganization.domain, req.user.domain)) {
        return res.status(400).json({ errors: { organization: "Organization does not belong to your domain" } });
      }
    }
    newLead.organization = organization;
  }

  if (!isEmpty(contact)) {
    if (!isValidModelId(contact)) {
      let contactToCreate = {
        _id: new mongoose.Types.ObjectId(),
        name: contact,
        organization: organization,
        domain: req.user.domain,
      };
      if (isEmpty(contactToCreate.organization)) delete contactToCreate.organization;
      contact = await Contact.create(contactToCreate);
    } else {
      const existingContact = await Contact.findById(contact);
      if (!existingContact) {
        return res.status(400).json({ errors: { contact: "Contact does not exist" } });
      }
      if (!isEqual(existingContact.domain, req.user.domain)) {
        return res.status(400).json({ errors: { contact: "Contact does not belong to your domain" } });
      }
      if (existingContact.organization && !isEqual(existingContact.organization.toString(), organization)) {
        return res.status(400).json({ errors: { contact: "Contact does not belong to given organization" } });
      }
    }
    newLead.contact = contact;
  }

  Lead.create(newLead)
    .then(lead => {
      res.json(lead);
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});

// @route   GET api/lead/:leadId
// @desc    Load lead by id
// @access  Private
router.get("/:leadId", leadMembersMiddlewares, (req, res) => {
  Lead.findById(req.params.leadId)
    .populate("notes.user", { password: 0 })
    .populate("notes.lastUpdater", { password: 0 })
    .populate([{ path: "contact" }, { path: "organization" }])
    .populate("owner")
    .populate("stage")
    .then(lead => {
      res.json(lead);
    })
    .catch(error => {
      res.status(500).json({ errors: { message: error } });
    });
});

// @route   PATCH api/lead/:leadId
// @desc    Update lead by id
// @access  Private
router.patch("/:leadId", leadMembersMiddlewares, (req, res) => {
  Lead.findByIdAndUpdate(req.params.leadId, { $set: req.body }, { new: true })
    .populate("notes.user", { password: 0 })
    .populate("notes.lastUpdater", { password: 0 })
    .populate([{ path: "contact" }, { path: "organization" }])
    .populate("owner")
    .populate("stage")
    .then(lead => {
      res.json(lead);
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});

// @route   POST api/lead/:leadId/notes
// @desc    Create note for lead
// @access  Private
router.post("/:leadId/notes", leadMembersMiddlewares, (req, res) => {
  Lead.findByIdAndUpdate(req.params.leadId, { $push: { notes: req.body } }, { new: true })
    .populate("notes.user", { password: 0 })
    .populate("notes.lastUpdater", { password: 0 })
    .populate([{ path: "contact" }, { path: "organization" }])
    .populate("owner")
    .populate("stage")
    .then(lead => {
      res.json(lead);
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});

// @route   PATCH api/lead/:leadId/note/:id
// @desc    Update note's lead
// @access  Private
router.patch("/:leadId/note/:noteId", leadMembersMiddlewares, (req, res) => {
  Lead.findOneAndUpdate(
    { _id: req.params.leadId, "notes._id": req.params.noteId }, 
    { $set:{ "notes.$.text": req.body.text, "notes.$.lastUpdater": req.user.id } }, 
    { new: true })
    .then(lead => {
      return res.json(lead);
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});

// @route   DELETE api/lead/:leadId/note/:id
// @desc    Delete note's lead
// @access  Private
router.delete("/:leadId/note/:noteId", leadMembersMiddlewares, (req, res) => {
  Lead.findByIdAndUpdate(req.params.leadId, { $pull: { notes: { _id: req.params.noteId } } }, { new: true })
    .then(lead => {
      return res.json(lead);
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});

export default router;
