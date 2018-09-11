import Lead from "../../models/lead";

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
          { "organizations.name": { $regex: `(?:^|\\W)${part}(?:|\\W)`, $options: "i" } },
          { "contacts.name": { $regex: `(?:^|\\W)${part}(?:|\\W)`, $options: "i" } },
          { name: { $regex: `(?:^|\\W)${part}(?:|\\W)`, $options: "i" } },
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