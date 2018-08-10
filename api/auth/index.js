import { Router } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import { secret } from "../authorize";
import User from "../../models/user";
import Domain from "../../models/domain";
import Funnel from "../../models/funnel";
import Stage from "../../models/stage";

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

const router = new Router();

// @route   GET api/register
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
    domain: domainId
  });

  const domain = new Domain({
    _id: domainId,
    name: req.body.company
  });

  let funnelId = new mongoose.Types.ObjectId();
  const funnel = new Funnel({
    _id: funnelId,
    name: "Default Lead Funnel",
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
      res.json({ data: { user: user._id } });
    })
    .catch(err => {
      let errors = {};

      if (typeof err.code !== "undefines" && err.code == 11000) {
        errors.email = "User with this Email is already exists";
      } else {
        errors.message = "It was a problem to save this data to database";
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
    order: order
  });
}

// @route   POST api/login
// @desc    User login
// @access  Public
router.post("/login", function(req, res) {
  const { hasErrors, errors } = validateLoginInput(req.body);
  if (hasErrors) return res.status(400).json({ errors });

  var user_ = null;

  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) throw "Invalid credentials!";
      user_ = user;
      return user.passwordMatches(req.body.password, user);
    })
    .then(matches => {
      if (!matches) throw "Invalid credentials!";

      var token = jwt.sign({ id: user_._id.toString() }, secret, {
        algorithm: "HS256",
        expiresIn: 60 * 60 * 24 * 10
      });

      res.json({
        token: token,
        data: { user: user_._id.toString(), domain: user_.domain.toString() }
      });
    })
    .catch(error => {
      res.status(401).json({ errors: { message: error } });
    });
});

export default router;