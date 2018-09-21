import Organization from "../../models/organization";

export const organizationAggregation = (domain) => {
  return Organization.aggregate([
    {
      $match: { domain: domain },
    },
    {
      $lookup: {
        from: "contacts",
        localField: "_id",
        foreignField: "organization",
        as: "contacts",
      },
    },
    {
      $lookup: {
        from: "leads",
        localField: "_id",
        foreignField: "organization",
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
        domain: 1,
        timestamp: 1,
        custom: 1,
        owner: 1,
        contacts: { $size: "$contacts" },
        openedLeads: { $size: "$openedLeads" },
        closedLeads: { $size: "$closedLeads" },
      },
    },
  ]).then(organizations => Organization.populate(organizations, Organization.populates.full));
};