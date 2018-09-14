import Lead from "../../models/lead";

const LEAD = "Lead";

const lookupOne = model => {
  return [
    {
      $lookup: {
        from: `${model}s`,
        localField: model,
        foreignField: "_id",
        as: model,
      },
    },
    {
      $unwind: {
        path: `$${model}`,
        preserveNullAndEmptyArrays: true,
      },
    },
  ];
};

const regexMatcher = query => {
  return { $regex: `(?:|\\W)${query}(?:|\\W)`, $options: "i" };
};

export const loadLeads = (domain, query) => {
  return Lead.aggregate([
    {
      $match: { domain: domain },
    },
    ...lookupOne('contact'),
    ...lookupOne('organization'),
    ...lookupOne('stage'),
    {
      $match: {
        $or: [
          { "organization.name": regexMatcher(query) },
          { "contact.name": regexMatcher(query) },
          { name: regexMatcher(query) },
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
      },
    },
  ])
    .sort({ order: "asc" })
    .then(leads => Promise.resolve(leads))
    .catch(error => Promise.reject(error));
};
