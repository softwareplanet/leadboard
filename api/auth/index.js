import { Router } from "express";
import mongoose from "mongoose";
import { secret } from "../authorize";
import User from"../../models/user";
import Domain from "../../models/domain";
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const jwt = require("jsonwebtoken");
const router = new Router();

// @route   GET api/register
// @desc    Register a new user
// @access  Public
router.post("/register", function(req, res) {
  const { hasErrors, errors } = validateRegisterInput(req.body);
  if (hasErrors) return res.status(400).json({ errors });

  var domainid = new mongoose.Types.ObjectId();

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    domain: domainid
  });

  const domain = new Domain({
    _id: domainid,
    name: req.body.company
  });

  user
    .save()
    .then(user_ => {
      return domain.save();
    })
    .then(domain => {
      res.json({ data: { user: user._id } });
    })
    .catch(err => {
      let errors = {};

      if (typeof err.code !== "undefines" && err.code == 11000) {
        errors.email = "User with this Email is already exists";
      } else {
        errors.email = "It was a problem to save this data to database";
      }
      res.status(400).json({ errors: errors });
    });
});

// @route   POST api/login
// @desc    User login
// @access  Public
router.post("/login", function(req, res) {
  const { hasErrors, errors } = validateLoginInput(req.body);
  if (hasErrors) return res.status(400).json({ errors });

  var user_ = null;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        errors.email = "Incorrect login";
        return res.status(404).json({ errors: errors });
      }

      user_ = user;
      return user.passwordMatches(req.body.password, user);
    })
    .then(matches => {
      if (!matches) {
        errors.password = "Password incorrect";
        return res.status(404).json({ errors: errors });
      }
      const payload = { id: user_._id};

      jwt.sign(
        payload,
        secret,
        { expiresIn: '240h' },
        (err, token) => {
          res.json({
            success: true,
            token: 'Bearer ' + token,
            data: { userId: user_._id.toString(), domainId: user_.domain.toString() }
          });
        }
      );
    });
});


// let token = jwt.sign({ id: user_._id.toString() }, secret, {
//         algorithm: "HS256",
//         expiresIn:'240h'
//       });
//
//       res.json({
//         token: token,
//         data: { userId: user_._id.toString(), domainId: user_.domain.toString() }
//       });
//     })
// });

export default router;
