import { Router } from "express";
import mongoose from "mongoose";

import validateActivityInput from "../../validation/activity";

import Activity from "../../models/activity";

const router = new Router();

// @route   POST api/activity
// @desc    Create activity
// @access  Private
router.post("/", (req, res) => {
  const { hasErrors, errors } = validateActivityInput(req.body);
  if (hasErrors) return res.status(400).json({ errors });
  createActivity(req, res);
});

const createActivity = (req, res) => {
  let activity = {
    _id: new mongoose.Types.ObjectId(),
    date: req.body.date,
    hasStartTime: req.body.hasStartTime,
    type: req.body.type,
    subject: req.body.subject,
    duration: req.body.duration,
    note: req.body.note,
    assignedTo: req.body.assignedTo,
    lead: req.body.lead,
    participants: req.body.participants,
    organization: req.body.organization,
    done: req.body.done,
    createdBy: req.user._id,
  };
  Activity.create(activity)
    .then(activity => {
      res.json(activity);
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
};

export default router;
