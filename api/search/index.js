import { Router } from "express";
import mongoose from "mongoose";
import Lead from "../../models/lead";

const router = new Router();

// @route   GET api/search
// @desc    Find leads by user and regex
// @access  Private
router.get("/", (req, res) => {
  Lead.aggregate([
    {
      $match: { owner: req.user._id }
    },
    {
      $lookup: {
        from: "contacts",
        localField: "contact",
        foreignField: "_id",
        as: "contacts"
      }
    },
    {
      $unwind: {
        path: "$contacts",
        preserveNullAndEmptyArrays: true,
      }
    },
    {
      $lookup: {
        from: "organizations",
        localField: "organization",
        foreignField: "_id",
        as: "organizations"
      }
    },
    {
      $unwind: {
        path: "$organizations",
        preserveNullAndEmptyArrays: true,
      }
    },
    {
      $match: {
        $or: [
          { "organizations.name": { $regex: `^${req.query.part}` } },
          { "contacts.name": { $regex: `^${req.query.part}` } },
          { name: { $regex: `^${req.query.part}` } },
        ],
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        status: 1,
        contactName: "$contacts.name",
        organizationName: "$organizations.name"
      }
    }
  ])
    .sort({ order: "asc" })
    .then(leads => {
      console.log(leads);
      res.json(leads);
    })
    .catch(error => {
      res.status(400).json({ errors: { message: error } });
    });
});

export default router;
