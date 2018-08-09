import { Router } from "express";
import mongoose from "mongoose";

import { require_auth } from "../authorize";
const validateLeadInput = require("../../validation/lead");
import Lead from "../../models/lead";

const router = new Router();

// @route   GET api/lead
// @desc    Find sorted leads by domain and stage IDs
// @access  Private
router.get("/", require_auth, function(req, res) {
  Lead.find({ stage: req.query.stage })
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
router.post("/", require_auth, function(req, res) {
  const { hasErrors, errors } = validateLeadInput(req.body);
  if (hasErrors) return res.status(400).json({ errors });

  const lead = {
    _id: new mongoose.Types.ObjectId(),
    owner: req.body.owner,
    stage: req.body.stage,
    name: req.body.name,
    order: req.body.order
  };
  Lead.create(lead)
    .then(lead => {
      res.json({ data: { lead: lead._id } });
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});

// @route   GET api/lead/:id
// @desc    Load lead by id
// @access  Private
router.get("/:id", require_auth, (req, res) => {
  Lead.findById(req.params.id)
    .populate("contacts")
    .populate("owner")
    .then(lead => {
      res.json({ lead });
    })
    .catch(error => {
      res.status(500).json({ errors: { message: error } });
    });
});

export default router;
