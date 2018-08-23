import { Router } from "express";
import mongoose from "mongoose";
import Organisation from "../../models/organization";
import { validateOrganizationCreation, validateOrganizationUpdate } from "../../validation/organization";

const router = new Router;

// @route   GET api/organization/:id
// @desc    Get organization by id
// @access  Private
router.get("/:id", (req, res) => {
  Organisation.findById(req.params.id)
    .then(organizations => {
      res.status(200).json(organizations);
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});

// @route   GET api/organization
// @desc    Return all organizations by domain
// @access  Private
router.get("/", (req, res) => {
  Organization.find({domain: req.user.domain}, "_id name")
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

  const organization = new Organisation({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    domain: req.user.domain,
  });

  Organisation.create(organization)
    .then(org => {
      res.status(200).json(org);
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

  Organisation.findOneAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true })
    .then(org => {
      res.status(200).json(org);
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});

export default router;
