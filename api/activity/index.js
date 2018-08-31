import { Router } from "express";

import Activity from "../../models/activity";

const router = new Router();

router.patch("/", (req, res) => {
  Activity.findByIdAndUpdate(req.body._id, req.body, { new: true })
    .then(activity => {
      res.json(activity);
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});

export default router;