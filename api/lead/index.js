import { Router } from "express";
import mongoose from "mongoose";

import { validateLeadInput, validateLeadUpdate } from "../../validation/lead";
import isEmpty from "lodash.isempty";
import { isEqual } from "lodash";
import { isValidModelId } from "../../validation/validationUtils";
import Lead from "../../models/lead";
import Contact from "../../models/contact";
import Organization from "../../models/organization";

const router = new Router();

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

  let newLead = {
    _id: new mongoose.Types.ObjectId(),
    owner: req.body.owner ? req.body.owner : req.user._id,
    stage: req.body.stage,
    name: req.body.name,
    order: req.body.order,
  };

  let organization = req.body.organization;
  if (!isEmpty(organization)) {
    if (isValidModelId(organization)) {
      const existingOrganization = await Organization.findById(organization);
      let { errors, hasErrors } = validateExisting(existingOrganization, "Organization", req.user.domain);
      if (hasErrors) return res.status(400).json({ errors });
    } else {
      organization = await createOrganization(organization, req.user.domain);
    }
    newLead.organization = organization;
  }

  let contact = req.body.contact;
  if (!isEmpty(contact)) {
    if (isValidModelId(contact)) {
      const existingContact = await Contact.findById(contact);
      let { errors, hasErrors } = validateExisting(existingContact, "Contact", req.user.domain);
      if (hasErrors) return res.status(400).json({ errors });
    } else {
      contact = await createContact(contact, organization, req.user.domain);
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

function createOrganization(name, domain) {
  return Organization.create({
    _id: new mongoose.Types.ObjectId(),
    name: name,
    domain: domain,
  });
}

function createContact(name, organization, domain) {
  let contactToCreate = {
    _id: new mongoose.Types.ObjectId(),
    name: name,
    organization: organization,
    domain: domain,
  };
  if (isEmpty(contactToCreate.organization)) delete contactToCreate.organization;
  return Contact.create(contactToCreate);
}

function validateExisting(model, name, domain) {
  let errors = {};
  if (!model) {
    errors[name.toLowerCase()] = `${name} does not exist`;
  } else if (!isEqual(model.domain, domain)) {
    errors[name.toLowerCase()] = `${name} does not belong to your domain`;
  }
  return {
    errors,
    hasErrors: !isEmpty(errors),
  };
}

// @route   GET api/lead/:id
// @desc    Load lead by id
// @access  Private
router.get("/:id", (req, res) => {
  Lead.findById(req.params.id)
    .populate("notes.user", { password: 0 })
    .populate("notes.lastUpdater", { password: 0 })
    .populate([{ path: "contact" }, { path: "organization" }])
    .populate("owner", { password: 0 })
    .populate("stage")
    .then(lead => {
      res.json(lead);
    })
    .catch(error => {
      res.status(500).json({ errors: { message: error } });
    });
});

// @route   PATCH api/lead/:id
// @desc    Update lead by id
// @access  Private
router.patch("/:id", async (req, res) => {
  const previousLead = await Lead.findById(req.params.id).populate("owner", { password: 0 });
  const { hasErrors, errors } = validateLeadUpdate(req.body, previousLead, req.user);
  if (hasErrors) return res.status(400).json({ errors });

  let updates = req.body;

  let organization = updates.organization;
  if (!isEmpty(organization)) {
    if (isValidModelId(organization._id ? organization._id : organization)) {
      const existingOrganization = await Organization.findById(organization);
      let { errors, hasErrors } = validateExisting(existingOrganization, "Organization", req.user.domain);
      if (hasErrors) return res.status(400).json({ errors });
    } else {
      organization = await createOrganization(organization, req.user.domain);
    }
    updates.organization = (typeof organization === "object" ? organization._id : organization);
  }

  let contact = updates.contact;
  if (!isEmpty(contact)) {
    if (isValidModelId(contact._id ? contact._id : contact)) {
      const existingContact = await Contact.findById(contact);
      let { errors, hasErrors } = validateExisting(existingContact, "Contact", req.user.domain);
      if (hasErrors) return res.status(400).json({ errors });
    } else {
      contact = await createContact(contact, updates.organization, req.user.domain);
    }
    updates.contact = (typeof contact === "object" ? contact._id : contact);
  }

  Lead.findByIdAndUpdate(req.params.id, { $set: updates }, { new: true })
    .populate("notes.user", { password: 0 })
    .populate("notes.lastUpdater", { password: 0 })
    .populate([{ path: "contact" }, { path: "organization" }])
    .populate("owner", { password: 0 })
    .populate("stage")
    .then(lead => {
      res.json(lead);
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});


// @route   POST api/lead/:id/notes
// @desc    Create note for lead
// @access  Private
router.post("/:id/notes", (req, res) => {
  Lead.findByIdAndUpdate(req.params.id, { $push: { notes: req.body } }, { new: true })
    .populate("notes.user", { password: 0 })
    .populate("notes.lastUpdater", { password: 0 })
    .populate([{ path: "contact" }, { path: "organization" }])
    .populate("owner", { password: 0 })
    .populate("stage")
    .then(lead => {
      res.json(lead);
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});

// @route   PATCH api/lead/:id/note/:id
// @desc    Update note's lead
// @access  Private
router.patch("/:leadId/note/:noteId", (req, res) => {
  Lead.findOneAndUpdate(
    { _id: req.params.leadId, "notes._id": req.params.noteId },
    { $set: { "notes.$.text": req.body.text, "notes.$.lastUpdater": req.user.id } },
    { new: true })
    .then(lead => {
      return res.json(lead);
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});

// @route   DELETE api/lead/:id/note/:id
// @desc    Delete note's lead
// @access  Private
router.delete("/:leadId/note/:noteId", (req, res) => {
  Lead.findByIdAndUpdate(req.params.leadId, { $pull: { notes: { _id: req.params.noteId } } }, { new: true })
    .then(lead => {
      return res.json(lead);
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});

export default router;
