import mongoose from "mongoose";
import { DOMAIN, ORGANIZATION, USER } from "./refs";

// Organization
const organizationSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  domain: { type: mongoose.Schema.Types.ObjectId, required: true, ref: DOMAIN },
  custom: [{ key: mongoose.Schema.Types.ObjectId, value: "string" }],
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: USER },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model(ORGANIZATION, organizationSchema);
