import mongoose from "mongoose";
import { USER, CONTACT, ORGANIZATION, LEAD } from "./refs";

const noteSchema = new mongoose.Schema({
  domain: { type: mongoose.Schema.Types.ObjectId, required: true },
  text: { type: String, required: true },
  lead: { type: mongoose.Schema.Types.ObjectId, ref: LEAD },
  contact: { type: mongoose.Schema.Types.ObjectId, ref: CONTACT },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: ORGANIZATION },
  date: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: USER },
  lastUpdater: { type: mongoose.Schema.Types.ObjectId, ref: USER },
});
const basicPopulates = [
  { path: "user" },
  { path: "lastUpdater" },
];

noteSchema.statics.populates = {
  basic: basicPopulates,
};

export default mongoose.model("Note", noteSchema);
