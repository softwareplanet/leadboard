import { Router } from "express";
import mongoose from "mongoose";
import validateActivityInput from "../../validation/activity";
import Activity from "../../models/activity";

const router = new Router();

// @route   GET api/activity/firstInLeadPlan
// @desc    Get activity
// @access  Private
router.get("/firstInLeadPlan", (req, res) => {
  Activity.aggregate([
    { $match: { domain: req.user.domain, done: false } },
    { $group:
        {
          _id: "$lead",
          hasStartTime: { $first: "$hasStartTime" },
          date: { $min: "$date" }
        }
    }
  ])
    .then(result => {
      const activities = result.map(activity => {
        return {
          lead: activity._id,
          date: activity.date,
          hasStartTime: activity.hasStartTime,
        }
      });
      res.json(activities);
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});

// @route   PATCH api/activity/:activityId
// @desc    Update activity
// @access  Private
router.patch("/:activityId", (req, res) => {
  Activity.findByIdAndUpdate(req.params.activityId, req.body, { new: true })
    .then(activity => {
      res.json(activity);
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});

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
    ...req.body,
    domain: req.user.domain,
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
