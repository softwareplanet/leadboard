
import mongoose from "mongoose";
import { CONTACT, DOMAIN, ORGANIZATION } from "./refs";

// Person
const contactSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  organization: { type: mongoose.Schema.Types.ObjectId, ref: ORGANIZATION },
  custom: [{ key: mongoose.Schema.Types.ObjectId, value: "string" }],
  domain: { type: mongoose.Schema.Types.ObjectId, required: true, ref: DOMAIN },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model(CONTACT, contactSchema);