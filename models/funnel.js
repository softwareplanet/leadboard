import mongoose from "mongoose";
import { FUNNEL } from "./refs";

const funnelSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  domain: { type: mongoose.Schema.Types.ObjectId, required: true },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model(FUNNEL, funnelSchema);
