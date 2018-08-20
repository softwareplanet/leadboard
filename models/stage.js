const mongoose = require("mongoose");

// Stage of particular funnel
const stageSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  funnel: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Funnel" },
  name: String,
  order: { type: Number, index: { unique: false } },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Stage", stageSchema);
