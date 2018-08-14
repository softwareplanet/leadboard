const mongoose = require("mongoose");

// Organization
const organizationSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  domain: { type: mongoose.Schema.Types.ObjectId, required: true },
  custom: [{ name: "string", value: "string" }],
  timestamp: { type: Date, default: Date.now }
});



organizationSchema.statics.findOneOrCreate = (organizationData) => {
  let organization = {
      _id:new mongoose.Types.ObjectId(),
      domain: mongoose.Types.ObjectId(organizationData.domain),
      name:organizationData.organization,
};

  if(mongoose.Types.ObjectId.isValid(organizationData.organization)) {
    return Organization.findById(organizationData.organization).then(organization => {
        if(organization===null) {
            return Organization.create({
                ...organization,
                name:organizationData.organization,

            });
        } else {
            return Promise.resolve(organization);
        }

    }).catch(error => Promise.reject(error));
  }
   return Organization.create(organization);
};

const Organization = mongoose.model("Organization", organizationSchema);

module.exports = Organization;
