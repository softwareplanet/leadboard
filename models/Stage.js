const mongoose = require("mongoose");

// Stage of particular funnel
const stageSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  //domain: { type: mongoose.Schema.Types.ObjectId, required: true },
  funnel: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: String,
  order: { type: Number, index: { unique: false } },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Stage", stageSchema);
