import { Router } from "express";
import mongoose from "mongoose";

import { require_auth } from "../authorize";


import validateLeadInput from "../../validation/lead";
import isEmpty from "lodash.isempty";

import Lead from "../../models/lead";
import Contact from "../../models/contact";
import Organization from "../../models/organization";


const router = new Router();

// @route   GET api/lead
// @desc    Find sorted leads by domain and stage IDs
// @access  Private
router.get("/", require_auth, function (req, res) {
  Lead.find({ stage: req.query.stage })
    .populate({ path: "contact", populate: { path: "organization" } })
    .sort({ order: "asc" })
    .then(leads => {
      res.json({ data: leads });
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});

// @route   POST api/lead
// @desc    Create lead
// @access  Private
router.post("/", require_auth, function (req, res) {
  const {hasErrors, errors} = validateLeadInput(req.body);
  if (hasErrors) return res.status(400).json({errors});

  if (req.body.organization) {
    Organization.findOneOrCreate(req.body)
      .then(organization => {
        let body = { ...req.body, organization: organization._id };
        if (isEmpty(body.contact))
          delete body['contact'];
        createLead({ body: body }, res);
      })
  } else {
    createLead(req, res);
  }
});

const createLead = (req, res) => {
  Contact.findOneOrCreate(req.body)
    .then((contact) => {
      let lead = {
        _id: new mongoose.Types.ObjectId(),
        owner: req.body.owner,
        stage: req.body.stage,
        name: req.body.name,
        order: req.body.order,
        contact: contact._id
      };
      Lead.create(lead)
        .then(lead => {
          res.json({ data: { lead: lead._id } });
        })
        .catch(error => {
          res.status(400).json({ errors: { message: error } });
        });
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error }
      });
    })
};


// @route   GET api/lead/:id
// @desc    Load lead by id
// @access  Private
router.get("/:id", require_auth, (req, res) => {
  Lead.findById(req.params.id)
    .populate({ path: "contact", populate: { path: "organization" } })
    .populate("owner")
    .populate("stage")
    .then(lead => {
      res.json({ lead });
    })
    .catch(error => {
      res.status(500).json({errors: {message: error}})
    });
});

// @route   PATCH api/lead/:id
// @desc    Update lead by id
// @access  Private
router.patch("/:id", require_auth, (req, res) => {
  Lead.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
    .populate({ path: "contact", populate: { path: "organization" } })
    .populate("owner")
    .populate("stage")
    .then(lead => {
      res.json({lead});
    })
    .catch(error => {
      res.status(400).json({errors: {message: error}})
    })
});
export default router;
