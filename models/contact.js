const mongoose = require('mongoose');

// Person 
const contactSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  ogranization_id: { type: mongoose.Schema.Types.ObjectId },
  custom: [{name: "string", value: "string"}],
  domain_id:   { type: mongoose.Schema.Types.ObjectId, required: true },
  timestamp: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Contact', contactSchema);
