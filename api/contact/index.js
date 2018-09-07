import { Router } from "express";
import mongoose from "mongoose";
import Contact from "../../models/contact";
import { validateContactCreation, validateContactUpdate } from "../../validation/contact";
import Organization from "../../models/organization";

const router = new Router();

// @route GET api/contact
// @desc Return all contacts that have name field
// @access Private
router.get("/", (req, res) => {
  Contact.aggregate([
    {
      $lookup: {
        from: "leads",
        localField: "_id",
        foreignField: "contact",
        as: "leads",
      },
    },
    {
      $addFields: {
        openedLeads: {
          $filter: {
            input: "$leads",
            as: "lead",
            cond: {
              $eq: ["$$lead.status", "InProgress"],
            },
          },
        },
      },
    },
    {
      $addFields: {
        closedLeads: {
          $filter: {
            input: "$leads",
            as: "lead",
            cond: {
              $gt: ["$$lead.status", "InProgress"],
            },
          },
        },
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        organization: 1,
        domain: 1,
        timestamp: 1,
        custom: 1,
        openedLeads: { $size: "$openedLeads" },
        closedLeads: { $size: "$closedLeads" },
      },
    },
  ], (err, result) => {
    Organization.populate(result, { path: "organization" }, (err, result) => {
      if (err) {
        res.status(400).json({ errors: { message: err } });
      } else {
        res.status(200).json(result);
      }
    });
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
