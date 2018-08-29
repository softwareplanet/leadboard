import { Router } from "express";
import mongoose from "mongoose";

import validateActivityInput from "../../validation/activity";

import Activity from "../../models/activity";

const router = new Router();

// @route   GET api/activity?lead=:id
// @desc    Find activities by lead
// @access  Private
router.get("/", (req, res) => {
  Activity.find({ lead: req.query.lead })
    .then(activities => {
      res.json(activities);
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});
