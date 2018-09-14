import { Router } from "express";
import mongoose from "mongoose";
import Funnel from "../../models/funnel";
import validateFunnelInput from "../../validation/funnel";
import { isValidModelId } from "../../validation/validationUtils";

const router = new Router();

const validateFunnelDomain = (req, res, next) => {
  if (isValidModelId(req.params.funnelId)) {
    Funnel.findById(req.params.funnelId)
      .then(funnel => {
        if (funnel !== null && funnel.domain.equals(req.user.domain)) {
          next();
        } else {
          return res.status(404).json({ errors: { message: "Funnel with provided id is not found in your domain" } });
        }
      });
  } else {
    return res.status(404).json({ errors: { message: "Provided funnel's id is not valid" } });
  }
};

// @route   GET api/funnel
// @desc    Return all funnels by domain
// @access  Private
router.get("/", function(req, res) {
  Funnel.find({ domain: req.user.domain })
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
    domain: req.user.domain,
  });
  Funnel.create(funnel)
    .then(funnel => {
      res.json(funnel);
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});

// @route   PATCH api/funnel/:funnelId
// @desc    update funnel
// @access  Private
router.patch("/:funnelId", validateFunnelDomain, function(req, res) {
  Funnel.findByIdAndUpdate(req.params.funnelId, { $set: req.body}, { new: true })
    .then(funnel => {
      res.json(funnel);
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});

export default router;
