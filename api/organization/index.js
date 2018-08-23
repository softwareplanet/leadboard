import { Router } from "express";
import Organization from "../../models/organization";

const router = new Router();

// @route   GET api/organization
// @desc    Return all organizations by domain
// @access  Private
router.get("/", (req, res) => {
  Organization.find({domain: req.user.domain}, "_id name")
    .then(organizations => {
      res.json(organizations);
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});

export default router;