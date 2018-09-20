import { Router } from "express";
import mongoose from "mongoose";
import Organization from "../../models/organization";
import { validateOrganizationCreation, validateOrganizationUpdate } from "../../validation/organization";
import { organizationAggregation } from "./organizationAggregation";

const router = new Router;

// @route   GET api/organization
// @desc    Get all organizations by domain
// @access  Private
router.get("/", (req, res) => {
  Organization.find({ domain: req.user.domain }, "name")
    .then(organizations => {
      res.json(organizations);
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});

// @route   GET api/organization/aggregated/
// @desc    Get all aggregated organizations
// @access  Private
router.get("/aggregated/", (req, res) => {
  organizationAggregation(req.user.domain)
    .then(organizations => {
      res.json(organizations);
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});

// @route   GET api/organization/:id
// @desc    Get organization by id
// @access  Private
router.get("/:id", (req, res) => {
  Organization.findById(req.params.id)
    .then(organizations => {
      res.json(organizations);
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});

// @route   POST api/organization
// @desc    Create organization
// @access  Private
router.post("/", (req, res) => {
  const { hasErrors, errors } = validateOrganizationCreation(req.body);
  if (hasErrors) return res.status(400).json({ errors });

  const organization = new Organization({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    domain: req.user.domain,
    owner: req.user._id,
  });

  Organization.create(organization)
    .then(org => {
      res.json(org);
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});

// @route   PATCH api/organization/:id
// @desc    Update organization
// @access  Private
router.patch("/:id", (req, res) => {
  const { hasErrors, errors } = validateOrganizationUpdate(req.body);
  if (hasErrors) return res.status(400).json({ errors });

  Organization.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then(org => {
      res.json(org);
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});

export default router;
