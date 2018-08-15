import { Router } from "express";
import isEmpty from "lodash.isempty";
import User from "../../models/user";

const router = new Router();
// @route   GET api/user
// @desc    Get user by id
// @access  Private
router.get("/:id",  function(req, res) {
  if (isEmpty(req.params.id)) return res.status(400).json({ errors: { id: "UserID is not defined" } });
  User.findById(req.params.id)
    .then(user => {
      user.password = undefined;
      res.json(user);
    })
    .catch(error => {
      res.status(400).json({ errors: { message: JSON.stringify(error) } });
    });
});

export default router;
