import { Router } from "express";
import mongoose from "mongoose";
import Contact from "../../models/contact";
import { validateContactCreation, validateContactUpdate } from "../../validation/contact";
import { contactAggregation } from "./contactAggregation";
import isEmpty from "lodash.isempty";
import { isValidModelId, validateExisting } from "../../validation/validationUtils";
import Organization from "../../models/organization";

const router = new Router();

const validateContactDomain = (req, res, next) => {
  if (isValidModelId(req.params.contactId)) {
    Contact.findById(req.params.contactId)
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
};

// @route GET api/contact
// @desc Return all contacts that have name field
// @access Private
router.get("/", (req, res) => {
  Contact.find({ domain: req.user.domain })
    .populate("organization", "name")
    .then(contacts => {
      res.json(contacts);
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});

// @route GET api/contact/aggregated/
// @desc Return all aggregated contacts that have name field
// @access Private
router.get("/aggregated/", (req, res) => {
  contactAggregation(req.user.domain)
    .then(contacts => {
      res.json(contacts);
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});

// @route   GET api/contact/aggregated/organization/:organizationId
// @desc    Get all aggregated contacts for specific organization
// @access  Private
router.get("/aggregated/organization/:organizationId", (req, res) => {
  contactAggregation(req.user.domain, req.params.organizationId)
    .then(organizations => {
      res.json(organizations);
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});

// @route   POST api/contact
// @desc    Create contact
// @access  Private
router.post("/", async (req, res) => {
  const { hasErrors, errors } = validateContactCreation(req.body);
  if (hasErrors) return res.status(400).json({ errors });

  const contact = new Contact({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    domain: req.user.domain,
    custom: req.body.custom ? req.body.custom : [],
    owner: req.user._id,
  });

  let organization = req.body.organization;
  if (!isEmpty(organization)) {
    if (isValidModelId(organization)) {
      const existingOrganization = await Organization.findById(organization);
      let { errors, hasErrors } = validateExisting(existingOrganization, "Organization", req.user.domain);
      if (hasErrors) return res.status(400).json({ errors });
    } else {
      organization = await createOrganization(organization, req.user.domain, req.user._id);
    }
    contact.organization = organization;
  }

  Contact.create(contact)
    .then(contact => {
      res.json(contact);
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

// @route   PATCH api/contact/:contactId
// @desc    Update contact
// @access  Private
router.patch("/:contactId", validateContactDomain, async (req, res) => {
  const { hasErrors, errors } = validateContactUpdate(req.body);
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

  Contact.findByIdAndUpdate(req.params.contactId, { $set: req.body }, { new: true })
    .populate(Contact.populates.full)
    .then(contact => {
      res.json(contact);
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});

// @route   GET api/contact/:contactId
// @desc    Get contact by id
// @access  Private
router.get("/:contactId", validateContactDomain, (req, res) => {
  Contact.findById(req.params.contactId)
    .populate(Contact.populates.full)
    .then(contact => {
      res.json(contact);
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});

export default router;
