const mongoose = require('mongoose');

// Organization
const organizationSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  domain_id:   { type: mongoose.Schema.Types.ObjectId, required: true },
  custom: [{name: "string", value: "string"}],
  timestamp: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Organization', organizationSchema);
