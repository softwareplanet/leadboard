import { Router } from "express";
import mongoose from "mongoose";
import { validateActivityInput, validateActivityUpdate } from "../../validation/activity";
import Activity from "../../models/activity";
import { isValidModelId } from "../../validation/validationUtils";

const router = new Router();

const assertActivityIdParam = (req, res, next) => {
  if (req.params.id) {
    return res.status(500).json({
      errors: { message: "You should use :activityId instead of :id in API request handlers" },
    });
  }
  next();
};

const validateActivityDomain = (req, res, next) => {
  if (isValidModelId(req.params.activityId)) {
    Activity.findById(req.params.activityId)
      .populate({ path: "lead", populate: { path: "owner" } })
      .then(activity => {
        if (activity !== null && activity.lead.owner.domain.equals(req.user.domain)) {
          next();
        } else {
          return res.status(404).json({ errors: { message: "Activity with provided id is not found in your domain" } });
        }
      });
  } else {
    return res.status(404).json({ errors: { message: "Provided activity's id is not valid" } });
  }
};
const activityMembersMiddlewares = [validateActivityDomain];

if (process.env.NODE_ENV !== "production") {
  activityMembersMiddlewares.unshift(assertActivityIdParam);
}

// @route   PATCH api/activity/:activityId
// @desc    Update activity
// @access  Private
router.patch("/:activityId", activityMembersMiddlewares, async (req, res) => {
  const { hasErrors, errors } = await validateActivityUpdate(req.body, req.user.domain);
  if (hasErrors) return res.status(400).json({ errors });

  let updatedActivity = { ...req.body };
  updatedActivity.lastEditor = req.user._id;
  updatedActivity.updatedAt = Date.now();
  Activity.findByIdAndUpdate(req.params.activityId, { $set: updatedActivity }, { new: true })
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

// @route   DELETE api/activity/:activityId
// @desc    Delete activity
// @access  Private
router.delete("/:activityId", activityMembersMiddlewares, (req, res) => {
  Activity.findByIdAndRemove(req.params.activityId)
    .then(() => res.status(204).send())
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});

export default router;
