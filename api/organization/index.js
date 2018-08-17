import { Router } from "express";
import { require_auth } from "../authorize";
import Organization from "../../models/organization";

const router = new Router();

// @route   GET api/organization
// @desc    Return all organizations by domain
// @access  Private
router.get("/", require_auth, function(req, res) {
  const domain = req.query.domain || req.body.domain;
  if (!domain) {
    return res.status(400).json({ errors: { domain: "Domain cannot be empty" } });
  }

  Organization.find({ domain: domain })
    .then(organizations => {
      res.json({ data: organizations });
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});

export default router;