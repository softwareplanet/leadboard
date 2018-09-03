import mongoose from "mongoose";
import { CONTACT, ORGANIZATION } from "./refs";

// Person
const contactSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  organization: { type: mongoose.Schema.Types.ObjectId, ref: ORGANIZATION},
  custom: [{ name: "string", value: "string" }],
  domain: { type: mongoose.Schema.Types.ObjectId, required: true },
  timestamp: { type: Date, default: Date.now }
});

//custom fields
const DEFAULT_CUSTOM_FIELDS = [{ name: "Phone", value: "" }, { name: "Email", value: "" }];

contactSchema.pre("save", function (next) {
  if (this.isNew) {
    if (this.custom.length === 0) {
      this.custom = DEFAULT_CUSTOM_FIELDS;
    }
  }
  next();
});

export default mongoose.model(CONTACT, contactSchema);
