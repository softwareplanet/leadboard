import { Router } from "express";
import mongoose from "mongoose";

import validateActivityInput from "../../validation/activity";
import isEmpty from "lodash.isempty";

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

// @route   POST api/activity
// @desc    Create activity
// @access  Private
router.post("/", (req, res) => {
  // const { hasErrors, errors } = validateActivityInput(req.body);
  // if (hasErrors) return res.status(400).json({ errors });
  createActivity(req, res);
});

const createActivity = (req, res) => {
  let activity = {
    _id: new mongoose.Types.ObjectId(),
    type: req.body.type,
    subject: req.body.subject,
    duration: req.body.duration,
    note: req.body.note,
    assignedTo: req.body.assignedTo._id,
    lead: req.body.lead._id,
    participants: req.body.participants,
    organization: req.body.organization,
    done: req.body.done
  };
  Activity.model.create(activity)
    .then(activity => {
      res.json(activity._id);
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
};

export default router;
