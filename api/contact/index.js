import { validateContactUpdate } from "../../validation/contact";
import Organisation from "../../models/organization";
import mongoose from "mongoose";
import { Router } from "express";

const router = new Router;

// @route   POST api/contact
// @desc    Create organization
// @access  Private
router.post("/", function(req, res) {
  const { hasErrors, errors } = validateContactUpdate(req.body);
  if (hasErrors) return res.status(400).json({ errors });

  const contact = new Organisation({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    domain: req.body.domain,
    organization: req.body.organization,
    custom: req.body.custom ? req.body.custom : [],
  });
  Organisation.create(contact)
    .then(org => {
      res.status(200).json(org._id);
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});

// @route   PATCH api/contact
// @desc    Update contact
// @access  Private
router.patch("/:id", function(req, res) {
  const { hasErrors, errors } = validateContactUpdate(req.body);
  if (hasErrors) return res.status(400).json({ errors });

  Organisation.findOneAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true })
    .then(contact => {
      res.status(200).json(contact);
    })
    .catch(error => {
      console.log(error);

      res.status(400).json({ errors: { message: error } });
    });
});

export default router;
