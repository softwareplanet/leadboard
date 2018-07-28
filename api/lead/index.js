import { Router } from "express";
import mongoose from "mongoose";

import { require_auth } from "../authorize";
import Lead from "../../models/lead";

const router = new Router();

router.get("/", require_auth, function(req, res) {
  Lead.find({})
    .where("domain_id")
    .equals(req.body.domain_id)
    .where("stage_id")
    .equals(req.body.stage_id)
    .sort({ order: "asc" })
    .then(leads => {
      res.json({ status: "success", data: leads });
    })
    .catch(err => {
      res.status(400).json({ status: "error", message: err });
    });
});

router.post("/", require_auth, function(req, res) {
  const lead = {
    _id: new mongoose.Types.ObjectId(),
    owner_id: req.body.owner_id,
    domain_id: req.body.domain_id,
    stage_id: req.body.stage_id,
    name: req.body.name,
    order: req.body.order
  };
  Lead.create(lead)
    .then(lead => {
      res.json({ status: "success", data: lead });
    })
    .catch(err => {
      res.status(400).json({ status: "error", message: err });
    });
});

export default router;
