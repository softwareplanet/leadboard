const mongoose = require('mongoose');

const funnelSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  domain_id:   { type: mongoose.Schema.Types.ObjectId, required: true },
  timestamp: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Funnel', funnelSchema);
