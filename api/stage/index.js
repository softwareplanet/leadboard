import { Router } from "express";
import mongoose from "mongoose";

import { require_auth } from "../authorize";
import Stage from "../../models/stage";
const validateStageInput = require("../../validation/stage");

const router = new Router();

// @route   GET api/stage
// @desc    Get ordered stages by domain and funnel IDs
// @access  Private
router.get("/", require_auth, function(req, res) {
  Stage.find({ domain: req.body.domain, funnel: req.body.funnel })
    .sort({ order: "asc" })
    .then(stages => {
      res.status(200).json({ data: stages });
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});

// @route   POST api/stage
// @desc    Create stage
// @access  Private
router.post("/", require_auth, function(req, res) {
  const { hasErrors, errors } = validateStageInput(req.body);
  if (hasErrors) return res.status(400).json({ errors });

  const stage = new Stage({
    _id: new mongoose.Types.ObjectId(),
    domain: req.body.domain,
    funnel: req.body.funnel,
    name: req.body.name,
    order: req.body.order
  });

  Stage.create(stage)
    .then(stage => {
      res.status(200).json({ data: { stage: stage._id } });
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});

export default router;
