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

// @route   PATCH api/activity?id=:id
// @desc    Update activity by id
// @access  Private
router.patch("/", (req, res) => {
  Activity.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(activity => {
      res.json(activity);
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});
