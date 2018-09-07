import { Router } from "express";
import mongoose from "mongoose";
import Contact from "../../models/contact";
import { validateContactCreation, validateContactUpdate } from "../../validation/contact";
import { contactAggregation } from "./contactAggregation";

const router = new Router();

// @route GET api/contact
// @desc Return all contacts that have name field
// @access Private
router.get("/", (req, res) => {
  contactAggregation(req.user.domain).then(contacts => {
      res.json(contacts);
    },
  ).catch(error => {
    res.status(400).json({ errors: { message: error } });
  });
});

// @route   POST api/contact
// @desc    Create contact
// @access  Private
router.post("/", function(req, res) {
  const { hasErrors, errors } = validateContactCreation(req.body);
  if (hasErrors) return res.status(400).json({ errors });

  const contact = new Contact({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    domain: req.user.domain,
    organization: req.body.organization,
    custom: req.body.custom ? req.body.custom : [],
    owner: req.user._id,
  });
  Contact.create(contact)
    .then(contact => {
      res.status(200).json(contact);
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});

// @route   PATCH api/contact/:id
// @desc    Update contact
// @access  Private
router.patch("/:id", function(req, res) {
  const { hasErrors, errors } = validateContactUpdate(req.body);
  if (hasErrors) return res.status(400).json({ errors });

  Contact.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true })
    .then(contact => {
      res.status(200).json(contact);
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});

export default router;
