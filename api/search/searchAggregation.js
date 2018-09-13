import Lead from "../../models/lead";
const LEAD = "Lead";

export const loadLeads = (domain, part) => {
  return Lead.aggregate([
    {
      $match: { domain: domain }
    },
    {
      $lookup: {
        from: "contacts",
        localField: "contact",
        foreignField: "_id",
        as: "contact"
      }
    },
    {
      $unwind: {
        path: "$contact",
        preserveNullAndEmptyArrays: true,
      }
    },
    {
      $lookup: {
        from: "organizations",
        localField: "organization",
        foreignField: "_id",
        as: "organization"
      }
    },
    {
      $unwind: {
        path: "$organization",
        preserveNullAndEmptyArrays: true,
      }
    },
    {
      $lookup: {
        from: "stages",
        localField: "stage",
        foreignField: "_id",
        as: "stage"
      }
    },
    {
      $unwind: {
        path: "$stage",
        preserveNullAndEmptyArrays: true,
      }
    },
    {
      $match: {
        $or: [
          { "organization.name": { $regex: `(?:|\\W)${part}(?:|\\W)`, $options: "i" } },
          { "contact.name": { $regex: `(?:|\\W)${part}(?:|\\W)`, $options: "i" } },
          { name: { $regex: `(?:|\\W)${part}(?:|\\W)`, $options: "i" } },
        ],
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        status: 1,
        contact: "$contact.name",
        organization: "$organization.name",
        stage: "$stage.name",
        type: LEAD,
      }
    }
  ])
    .sort({ order: "asc" })
    .then(leads => Promise.resolve(leads))
    .catch(error => Promise.reject(error))
};