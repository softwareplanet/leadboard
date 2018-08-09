import { Router } from "express";
import mongoose from "mongoose";
import Funnel from "../../models/funnel";
const validateFunnelInput = require("../../validation/funnel");

const router = new Router();

// @route   GET api/funnel
// @desc    Return all funnels by domain
// @access  Private
router.get("/", function(req, res) {
  const domain = req.query.domain || req.body.domain;
  if (!domain) {
    return res.status(400).json({ errors: { domain: "Domain cannot be empty" } });
  }

  Funnel.find({ domain: domain })
    .then(funnels => {
      res.json({ data: funnels });
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});

// @route   GET api/funnel
// @desc    Create a new funnel
// @access  Private
router.post("/", function(req, res) {
  const { hasErrors, errors } = validateFunnelInput(req.body);
  if (hasErrors) return res.status(400).json({ errors });

  const funnel = new Funnel({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    domain: req.body.domain
  });
  Funnel.create(funnel)
    .then(funnel => {
      res.json({ data: { funnel: funnel._id } });
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});

export default router;
