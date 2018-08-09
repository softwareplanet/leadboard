const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  stage: { type: mongoose.Schema.Types.ObjectId },
  owner: { type: mongoose.Schema.Types.ObjectId },
  visibility: Number,
  name: String,
  order: { type: Number, index: { unique: false } },
  contact: { type: mongoose.Schema.Types.ObjectId },
  custom: [{ name: "string", value: "string" }],
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Lead", leadSchema);
