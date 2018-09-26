import { Router } from "express";
import mongoose from "mongoose";
import { validateLeadInput, validateLeadUpdate } from "../../validation/lead";
import isEmpty from "lodash.isempty";
import { isValidModelId, validateExisting } from "../../validation/validationUtils";
import Lead from "../../models/lead";
import Contact from "../../models/contact";
import Organization from "../../models/organization";
import Activity from "../../models/activity";

const router = new Router();

const assertLeadIdParam = (req, res, next) => {
  if (req.params.id) {
    return res.status(500).json({
      errors: { message: "You should use :leadId instead of :id in API request handlers" },
    });
  }
  next();
};

const validateLeadDomain = (req, res, next) => {
  if (isValidModelId(req.params.leadId)) {
    Lead.findById(req.params.leadId)
      .populate("owner")
      .then(lead => {
        if (lead !== null && lead.owner.domain.equals(req.user.domain)) {
          next();
        } else {
          return res.status(404).json({ errors: { message: "Lead with provided id is not found in your domain" } });
        }
      });
  } else {
    return res.status(404).json({ errors: { message: "Provided lead's id is not valid" } });
  }
};
const leadMembersMiddlewares = [validateLeadDomain];

if (process.env.NODE_ENV !== "production") {
  leadMembersMiddlewares.unshift(assertLeadIdParam);
}

// @route   GET api/lead
// @desc    Find sorted leads by domain and stage IDs
// @access  Private
router.get("/", (req, res) => {
  Lead.find({ stage: req.query.stage, status: req.query.status })
    .populate(Lead.populates.basic)
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
    domain: req.user.domain,
    owner: req.user._id,
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
      organization = await createOrganization(organization, req.user.domain, req.user._id);
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
      contact = await createContact(contact, organization, req.user.domain, req.user._id);
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

function createOrganization(name, domain, owner) {
  return Organization.create({
    _id: new mongoose.Types.ObjectId(),
    name: name,
    domain: domain,
    owner: owner,
  });
}

function createContact(name, organization, domain, owner) {
  let contactToCreate = {
    _id: new mongoose.Types.ObjectId(),
    name: name,
    organization: organization,
    domain: domain,
    owner: owner,
  };
  if (isEmpty(contactToCreate.organization)) delete contactToCreate.organization;
  return Contact.create(contactToCreate);
}

// @route   GET api/lead/:leadId
// @desc    Load lead by id
// @access  Private
router.get("/:leadId", leadMembersMiddlewares, (req, res) => {
  Lead.findById(req.params.leadId)
    .populate(Lead.populates.full)
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
router.patch("/:leadId", leadMembersMiddlewares, async (req, res) => {
  const previousLead = await Lead.findById(req.params.leadId).populate("owner", { password: 0 });
  const { hasErrors, errors } = validateLeadUpdate(req.body, previousLead);
  if (hasErrors) return res.status(400).json({ errors });

  let updates = req.body;

  let organization = updates.organization;
  if (!isEmpty(organization)) {
    if (isValidModelId(organization._id ? organization._id : organization)) {
      const existingOrganization = await Organization.findById(organization);
      let { errors, hasErrors } = validateExisting(existingOrganization, "Organization", req.user.domain);
      if (hasErrors) return res.status(400).json({ errors });
    } else {
      organization = await createOrganization(organization, req.user.domain, req.user._id);
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
      contact = await createContact(contact, updates.organization, req.user.domain, req.user._id);
    }
    updates.contact = (typeof contact === "object" ? contact._id : contact);
  }

  Lead.findByIdAndUpdate(req.params.leadId, { $set: updates }, { new: true })
    .populate(Lead.populates.full)
    .then(lead => {
      res.json(lead);
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});

// @route   DELETE api/lead/:leadId
// @desc    Delete lead
// @access  Private
router.delete("/:leadId", leadMembersMiddlewares, (req, res) => {
  Lead.findByIdAndRemove(req.params.leadId)
    .then(() => {
      return res.sendStatus(204);
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});

export default router;
