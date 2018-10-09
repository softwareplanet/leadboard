import { Router } from "express";
import isEmpty from "lodash.isempty";
import User from "../../models/user";

const router = new Router();
// @route   GET api/user/:id
// @desc    Get user by id
// @access  Private
router.get("/:id", function(req, res) {
  if (isEmpty(req.params.id)) return res.status(400).json({ errors: { id: "UserID is not defined" } });
  User.findById(req.params.id)
    .populate({ path: "domain" })
    .then(user => {
      user.password = undefined;
      res.json(user);
    })
    .catch(error => {
      res.status(400).json({ errors: { message: JSON.stringify(error) } });
    });
});

// @route   GET api/user
// @desc    Get users by domain
// @access  Private
router.get("/", function(req, res) {
  User.find({ domain:req.user.domain }, { password: 0 })
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      res.status(400).json({ errors: { message: JSON.stringify(error) } });
    });
});

export default router;
