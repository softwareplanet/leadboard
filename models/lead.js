import mongoose from "mongoose";
import { LEAD, USER, STAGE, ORGANIZATION, CONTACT, DOMAIN } from "./refs";

const leadSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  domain: { type: mongoose.Schema.Types.ObjectId, ref: DOMAIN },
  stage: { type: mongoose.Schema.Types.ObjectId, ref: STAGE },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: USER },
  visibility: Number,
  name: String,
  order: { type: Number, index: { unique: false } },
  contact: { type: mongoose.Schema.Types.ObjectId, ref: CONTACT },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: ORGANIZATION },
  custom: [{ key: mongoose.Schema.Types.ObjectId, value: "string" }],
  timestamp: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["Won", "Lost", "InProgress"],
    default: "InProgress",
  },
  notes: [{
    text: String,
    date: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: USER },
    lastUpdater: { type: mongoose.Schema.Types.ObjectId, ref: USER },
  }],
});

const basicPopulates = [
  { path: "contact" },
  { path: "organization" },
];

const detailedPopulates = [
  ...basicPopulates,
  { path: "owner", select: '-password' },
  { path: "stage", populate: { path: "funnel" } },
];

const fullPopulates = [
  ...detailedPopulates,
];

leadSchema.statics.populates = {
  basic: basicPopulates,
  detailed: detailedPopulates,
  full: fullPopulates,
};

export default mongoose.model(LEAD, leadSchema);
