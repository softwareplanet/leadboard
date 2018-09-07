import { Router } from "express";
import mongoose from "mongoose";
import Organization from "../../models/organization";
import User from "../../models/user";
import { validateOrganizationCreation, validateOrganizationUpdate } from "../../validation/organization";

const router = new Router;

// @route   GET api/organization/:id
// @desc    Get organization by id
// @access  Private
router.get("/:id", (req, res) => {
  Organization.findById(req.params.id)
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
  Organization.aggregate([
    {
      $match: {domain: req.user.domain}
    },
    {
      $lookup: {
        from: "contacts",
        localField: "_id",
        foreignField: "organization",
        as: "contacts",
      },
    },
    {
      $lookup: {
        from: "leads",
        localField: "_id",
        foreignField: "organization",
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
        domain: 1,
        timestamp: 1,
        custom: 1,
        owner: 1,
        contacts: { $size: "$contacts" },
        openedLeads: { $size: "$openedLeads" },
        closedLeads: { $size: "$closedLeads" },
      },
    },
  ], (error, organizations) => {
    Organization.populate(organizations, Organization.populates.full, (error, organizations) => {
      if (error) {
        res.status(400).json({ errors: { message: error } });
      } else {
        res.status(200).json(organizations);
      }
    });
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

  Organization.findByIdAndUpdate(
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
