import { Router } from "express";
import mongoose from "mongoose";

import { secret } from "../authorize";
import User from "../../models/user";
import Domain from "../../models/domain";
import validateRegisterInput from "../../validation/register";
import validateLoginInput from "../../validation/login";
import jwt from "jsonwebtoken";
import Funnel from "../../models/funnel";
import Stage from "../../models/stage";

const router = new Router();

// @route   POST api/register
// @desc    Register a new user
// @access  Public
router.post("/register", function(req, res) {
  const { hasErrors, errors } = validateRegisterInput(req.body);
  if (hasErrors) return res.status(400).json({ errors });

  let domainId = new mongoose.Types.ObjectId();

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    domain: domainId,
  });

  const domain = new Domain({
    _id: domainId,
    name: req.body.company,
  });

  let funnelId = new mongoose.Types.ObjectId();
  const funnel = new Funnel({
    _id: funnelId,
    name: "Funnel",
    domain: domainId
  });

  let stages = [];
  stages.push(createStage(funnelId, "Awareness", "1"));
  stages.push(createStage(funnelId, "Interest", "2"));
  stages.push(createStage(funnelId, "Decision", "3"));
  stages.push(createStage(funnelId, "Action", "4"));

  user
    .save()
    .then(user_ => {
      return domain.save();
    })
    .then(domain => {
      return funnel.save();
    })
    .then(funnel => {
      stages.forEach(stage => stage.save());
    })
    .then(() => {
      res.json({ user: user._id });
    })
    .catch(err => {
      let errors = {};

      const MONGO_UNIQUE_CONSTRAINT_VIOLATION_CODE = 11000;
      if (err.code && err.code === MONGO_UNIQUE_CONSTRAINT_VIOLATION_CODE) {
        errors.email = "User with this Email is already exists";
      } else {
        errors.email = "It was a problem to save this data to database";
      }
      res.status(400).json({ errors: errors });
    });
});

function createStage(funnel, name, order) {
  let stageId = new mongoose.Types.ObjectId();
  return new Stage({
    _id: stageId,
    name: name,
    funnel: funnel,
    order: order,
  });
}

// @route   POST api/login
// @desc    User login
// @access  Public
router.post("/login", function(req, res) {
  const { hasErrors, errors } = validateLoginInput(req.body);
  if (hasErrors) {
    return res.status(400).json({ errors: errors });
  }
  User.findOne({ email: req.body.email })
    .populate({ path: "domain" })
    .then(user => {
      if (!user) {
        errors.email = "Incorrect login";
        return res.status(404).json({ errors: errors });
      } else {
        user.passwordMatches(req.body.password, user).then(matches => {
          if (matches) {
            const payload = { id: user._id };
            jwt.sign(
              payload,
              secret,
              { expiresIn: "240h" },
              (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token,
                  userId: user._id.toString(),
                  domainId: user.domain._id.toString(),
                  domainName: user.domain.name.toString(),
                  userName: `${user.firstname.toString()} ${user.lastname.toString()}`,
                });
              });
          } else {
            errors.password = "Incorrect password";
            return res.status(404).json({ errors: errors });
          }
        });
      }
    });
});

export default router;
