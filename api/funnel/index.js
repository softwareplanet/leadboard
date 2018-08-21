import { Router } from "express";
import mongoose from "mongoose";
import Funnel from "../../models/funnel";
import validateFunnelInput from "../../validation/funnel";

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
      res.status(200).json(funnels);
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});

// @route   POST api/funnel
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
      res.json(funnel._id);
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});

export default router;
