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
  if(mongoose.Types.ObjectId.isValid(organizationData.organization)) {
    return Organization.findById(organizationData.organization).then(organization => {
        if(organization===null) {
            return Organization.create({
                _id:new mongoose.Types.ObjectId(),
                name:organizationData.organization,
                domain: mongoose.Types.ObjectId(organizationData.domain)});
        } else {
            return Promise.resolve(organization);
        }

    }).catch(error => Promise.reject(error));
  }
   return Organization.create({
       _id:new mongoose.Types.ObjectId(),
       name:organizationData.organization,
       domain: mongoose.Types.ObjectId(organizationData.domain)});
};

const Organization = mongoose.model("Organization", organizationSchema);

module.exports = Organization;
