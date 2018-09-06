import mongoose from "mongoose";
import { DOMAIN } from "./refs";

const domainSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: [true, "Company name is required"] },
  timestamp: { type: Date, default: Date.now },
  timezone: {type: String, default: "Etc/UTC" }
});

export default mongoose.model(DOMAIN, domainSchema);
