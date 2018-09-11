import { Router } from "express";
import mongoose from "mongoose";
import Lead from "../../models/lead";

const router = new Router();

// @route   GET api/searchResults
// @desc    Search result by domain and regex
// @access  Private

router.get("/",async (req, res) => {
  let leads = await loadLeads(req.user.domain, req.query.part);
  res.json({
    leads,
  });
});

const loadLeads = (domain, part) => {
  return Lead.aggregate([
    {
      $match: { domain: domain }
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
          { "organizations.name": { $regex: `^${part}` } },
          { "contacts.name": { $regex: `^${part}` } },
          { name: { $regex: `^${part}` } },
        ],
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        status: 1,
        contactName: "$contacts.name",
        organizationName: "$organizations.name",
      }
    }
  ])
    .sort({ order: "asc" })
    .then(leads => Promise.resolve(leads))
    .catch(error => Promise.reject(error))
};

export default router;
