import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  stage: { type: mongoose.Schema.Types.ObjectId, ref: "Stage" },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  visibility: Number,
  name: String,
  order: { type: Number, index: { unique: false } },
  contact: { type: mongoose.Schema.Types.ObjectId, ref: "Contact" },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: "Organization" },
  custom: [{ name: "string", value: "string" }],
  timestamp: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["Won", "Lost", "InProgress"],
    default: "InProgress"
  },
  notes: [{
    text: String,
    date: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  }]
});

module.exports = mongoose.model("Lead", leadSchema);
