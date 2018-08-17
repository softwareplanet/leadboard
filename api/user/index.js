import { Router } from "express";
const isEmpty = require("lodash.isempty");

import User from "../../models/user";
import { require_auth } from "../authorize";

const router = new Router();

// @route   GET api/user
// @desc    Get user by id
// @access  Private
router.get("/:id", require_auth, function(req, res) {
  if (isEmpty(req.params.id)) return res.status(400).json({ errors: { id: "UserID is not defined" } });

  User.findById(req.params.id)
    .populate({ path: "domain" })
    .then(user => {
      res.json({ data: { user } });
    })
    .catch(error => {
      res.status(400).json({ errors: { message: JSON.stringify(error) } });
    });
});

export default router;
