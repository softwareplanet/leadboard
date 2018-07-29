import { Router } from "express";
import mongoose from "mongoose";

import { require_auth } from "../authorize";
import Stage from "../../models/stage";

const router = new Router();

router.get("/", require_auth, function(req, res) {
  Stage.find()
    .where("domain_id")
    .equals(req.body.domain_id)
    .where("funnel_id")
    .equals(req.body.funnel_id)
    .sort({ order: "asc" })
    .exec()
    .then(stages => {
      res.status(200).json({ status: "success", data: stages });
    })
    .catch(err => {
      res.status(400).json({ status: "error", message: err });
    });
});

router.post("/", require_auth, function(req, res) {
  const stage = new Stage({
    _id: new mongoose.Types.ObjectId(),
    domain_id: req.body.domain_id,
    funnel_id: req.body.funnel_id,
    name: req.body.name,
    order: req.body.order
  });

  Stage.create(stage)
    .then(stage => {
      res.status(200).json({ status: "success", data: stage });
    })
    .catch(err => {
      res.status(400).json({ status: "error", message: err });
    });
});

export default router;
