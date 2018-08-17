import { Router } from "express";
import Organization from "../../models/organization";

const router = new Router();

// @route   GET api/organization
// @desc    Return all organizations by domain
// @access  Private
router.get("/", function(req, res) {
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