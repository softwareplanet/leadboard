import { Router } from "express";
import mongoose from "mongoose";
import Stage from "../../models/stage";
import { validateStageInput, validateStageSearchInput } from "../../validation/stage";
import { isValidModelId, isBlank } from "../../validation/validationUtils";

const router = new Router();

const validateStageDomain = (req, res, next) => {
  if (isValidModelId(req.params.stageId)) {
    Stage.findById(req.params.stageId)
      .populate("funnel")
      .then(stage => {
        if (stage !== null && stage.funnel.domain.equals(req.user.domain)) {
          next();
        } else {
          return res.status(404).json({ errors: { message: "Stage with provided id is not found in your domain" } });
        }
      });
  } else {
    return res.status(404).json({ errors: { message: "Provided stage's id is not valid" } });
  }
};

// @route   GET api/stage
// @desc    Get ordered stages by funnel IDs
// @access  Private
router.get("/", function(req, res) {
  const { hasErrors, errors } = validateStageSearchInput(req.query);
  if (hasErrors) return res.status(400).json({ errors });

  Stage.find({ funnel: req.query.funnel })
    .sort({ order: "asc" })
    .then(stages => {
      res.status(200).json(stages);
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});

// @route   POST api/stage
// @desc    Create stage
// @access  Private
router.post("/", function(req, res) {
  const { hasErrors, errors } = validateStageInput(req.body);
  if (hasErrors) return res.status(400).json({ errors });

  const stage = new Stage({
    _id: new mongoose.Types.ObjectId(),
    funnel: req.body.funnel,
    name: req.body.name,
    order: req.body.order
  });

  Stage.create(stage)
    .then(stage => {
      res.status(200).json(stage);
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});

// @route   PATCH api/stage/:stageId
// @desc    Update stage
// @access  Private
router.patch("/:stageId", validateStageDomain, (req, res) => {
  if (isBlank(req.body.name)) { 
    return res.status(400).json("Name cannot be empty");
  }

  Stage.findByIdAndUpdate(
    req.params.stageId,
    { $set: req.body },
    { new: true })
    .then(stage => {
      res.status(200).json(stage);
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});

export default router;
