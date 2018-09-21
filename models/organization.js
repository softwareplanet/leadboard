import mongoose from "mongoose";
import { DOMAIN, ORGANIZATION, USER } from "./refs";

// Organization
const organizationSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  domain: { type: mongoose.Schema.Types.ObjectId, required: true, ref: DOMAIN },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: USER },
  custom: [{ key: mongoose.Schema.Types.ObjectId, value: "string" }],
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: USER },
  timestamp: { type: Date, default: Date.now },
});

const ownerPopulates = [{ path: "owner", select: "email" }];

const fullPopulates = [
  ...ownerPopulates,
];

organizationSchema.statics.populates = {
  full: fullPopulates,
};

export default mongoose.model(ORGANIZATION, organizationSchema);