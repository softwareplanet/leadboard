import { Router } from "express";
import mongoose from "mongoose";

import { require_auth } from "../authorize";

const validateLeadInput = require("../../validation/lead");
import Lead from "../../models/lead";
import contact from '../../models/contact';
import organization from '../../models/organization';

const router = new Router();

// @route   GET api/lead
// @desc    Find sorted leads by domain and stage IDs
// @access  Private
router.get("/", require_auth, function(req, res) {
  Lead.find({ stage: req.query.stage })
      .populate({path:'contact', populate:{path:'organization'}})
    .sort({ order: "asc" })
    .then(leads => {
      res.json({ data: leads });
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});

// @route   POST api/lead
// @desc    Create lead
// @access  Private
router.post("/", function(req, res) {
  const { hasErrors, errors } = validateLeadInput(req.body);
  if (hasErrors) return res.status(400).json({ errors });
  createLead(req, res);
  /*const lead = {
    _id: new mongoose.Types.ObjectId(),
    owner: req.body.owner,
    stage: req.body.stage,
    name: req.body.name,
    order: req.body.order
  };
  Lead.create(lead)
    .then(lead => {
      res.json({ data: { lead: lead._id } });
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });*/
});

const createLead = (req, res) => {
    contact.findOneOrCreate(req.body)
        .then((contact) => {
            let lead = {
                _id: new mongoose.Types.ObjectId(),
                owner: req.body.owner,
                stage: req.body.stage,
                name: req.body.name,
                order: req.body.order,
                contact: contact._id
            };
            Lead.create(lead)
                .then(lead => {
                    res.json({data: {lead: lead._id}});
                })
                .catch(error => {
                    res.status(400).json({errors: {message: error}});
                });
        })
        .catch(error => res.status(400).json({errors: {message: error}}))
};

router.get('/:id', function (req, res) {
  Lead.findById(req.params.id)
      .populate('contact')
      .then(lead => {
        console.log(lead);
        res.json(lead)} )
      .catch(error => {
        res.status(500).json({errors: {message: error}})
      });
});

export default router;
