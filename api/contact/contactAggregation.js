import Contact from "../../models/contact";
import mongoose from "mongoose";

export const contactAggregation = (domain, organization) => {
  return Contact.aggregate([
    {
      $match: {
        $and: [
          { domain: domain },
          organization ? { organization: mongoose.Types.ObjectId(organization) } : {},
        ],
      },
    },
    {
      $lookup: {
        from: "leads",
        localField: "_id",
        foreignField: "contact",
        as: "leads",
      },
    },
    {
      $addFields: {
        openedLeads: {
          $filter: {
            input: "$leads",
            as: "lead",
            cond: {
              $eq: ["$$lead.status", "InProgress"],
            },
          },
        },
      },
    },
    {
      $addFields: {
        closedLeads: {
          $filter: {
            input: "$leads",
            as: "lead",
            cond: {
              $gt: ["$$lead.status", "InProgress"],
            },
          },
        },
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        organization: 1,
        domain: 1,
        owner: 1,
        timestamp: 1,
        custom: 1,
        openedLeads: { $size: "$openedLeads" },
        closedLeads: { $size: "$closedLeads" },
      },
    },
  ]).then(contacts => Contact.populate(contacts, Contact.populates.full));
};
