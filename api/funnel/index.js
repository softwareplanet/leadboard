import { Router } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import { require_auth } from "../authorize";
import Funnel from "../../models/funnel";

const router = new Router();

router.get("/", require_auth, function(req, res) {
  Funnel.find()
    .where("domain_id")
    .equals(req.body.domain_id)
    .exec()
    .then(funnels => {
      res.status(200).json({ status: "success", data: funnels });
    })
    .catch(err => {
      res.status(500).json({ status: "error", message: err });
    });
});

router.post("/", require_auth, function(req, res) {
  const funnel = new Funnel({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    domain_id: req.body.domain_id
  });
  Funnel.create(funnel)
    .then(funnel => {
      res.status(200).json({ status: "success", data: funnel });
    })
    .catch(err => {
      res.status(500).json({ status: "error", message: err });
    });
});

export default router;
