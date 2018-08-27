import { Router } from "express";
import mongoose from "mongoose";
import Contact from "../../models/contact";
import { validateContactCreation } from "../../validation/contact";

const router = new Router();

// @route GET api/contact
// @desc Return all contacts that have name field
// @access Private
router.get("/", (req, res) => {
  Contact.find({ domain: req.user.domain, name: {$exists: true} }, "name")
    .populate("organization", "_id name")
    .then(contacts => {
      res.json(contacts)
    })
    .catch(error => {
      res.status(400).json({ errors: {message: error} })
    })
});

// @route POST api/contact
// @desc Create contact
// @access Private
router.post("/", (req, res) => {
  const { hasErrors, errors } = validateContactCreation(req.body);
  if (hasErrors) return res.status(400).json({ errors });

  const contact = new Contact({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    domain: req.user.domain,
    organization: req.body.organization,
  });

  Contact.create(contact)
    .then(contact => {
      res.status(200).json(contact);
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});

export default router;