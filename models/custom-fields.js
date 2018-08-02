const mongoose = require("mongoose");

const customFieldsSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  entity: String, // :lead, :contact, :organization
  label: String, // Skype Name
  name: String, // skype
  type: String, // string
  order: Number, // 1
  domain: { type: mongoose.Schema.Types.ObjectId, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("CustomFields", customFieldsSchema);
