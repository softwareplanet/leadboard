import { Router } from "express";
import mongoose from "mongoose";
import { require_auth } from "../authorize";
import Organisation from "../../models/organization";
import validateOrganizationInput from "../../validation/organization";

const router  = new Router;

// @route   GET api/organization
// @desc    Get all organizations domain id and part of name
// @access  Private
router.get("/domain/:domain", require_auth, function(req, res) {
  Organisation.find({
    name : new RegExp(req.query.name, 'i'),
    domain: req.params.domain
  })
    .then(organizations => {
      res.status(200).json(organizations);
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});

// @route   POST api/organization
// @desc    Create organization
// @access  Private
router.post("/", require_auth, function(req, res) {
  const { hasErrors, errors } = validateOrganizationInput(req.body);
  if (hasErrors) return res.status(400).json({ errors });

  const organization = new Organisation({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    domain: req.body.domain
  });

  Organisation.create(organization)
    .then(org => {
      res.status(200).json({ organizationId: org._id });
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});

export default router;