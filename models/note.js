import mongoose from "mongoose";
import { USER, CONTACT, ORGANIZATION, LEAD } from "./refs";

const noteSchema = new mongoose.Schema({
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


noteSchema.statics.findNoteByModel = (model, id) => {
  switch (model) {
    case "lead":
      return this.find({ lead: id });
    case "contact":
      return this.find({ contact: id });
    case "organization":
      return this.find({ organization: id });
    default:
      return Promise.reject(Error("Bad model's type"));
  }
};

export default mongoose.model("Note", noteSchema);
