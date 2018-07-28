const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  stage_id: { type: mongoose.Schema.Types.ObjectId },
  owner_id: { type: mongoose.Schema.Types.ObjectId },
  visibility: Number,
  name: String,
  order: { type: Number, index: {unique: false} },
  contact_id: { type: mongoose.Schema.Types.ObjectId },
  domain_id:   { type: mongoose.Schema.Types.ObjectId, required: true },
  custom: [{name: "string", value: "string"}],
  timestamp: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Lead', leadSchema);
