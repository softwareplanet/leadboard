import mongoose from "mongoose";
import { STAGE, FUNNEL } from "./refs";

// Stage of particular funnel
const stageSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  funnel: { type: mongoose.Schema.Types.ObjectId, required: true, ref: FUNNEL },
  name: String,
  order: { type: Number, index: { unique: false } },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model(STAGE, stageSchema);
