import mongoose from "mongoose";
import { ORGANIZATION, USER } from "./refs";

// Organization
const organizationSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  domain: { type: mongoose.Schema.Types.ObjectId, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: USER },
  custom: [{ name: "string", value: "string" }],
  timestamp: { type: Date, default: Date.now },
});

//custom fields
const DEFAULT_CUSTOM_FIELDS = [{ name: "Address", value: "" }];

organizationSchema.pre("save", function(next) {
  if (this.isNew) {
    if (this.custom.length === 0) {
      this.custom = DEFAULT_CUSTOM_FIELDS;
    }
  }
  next();
});

export default mongoose.model(ORGANIZATION, organizationSchema);
