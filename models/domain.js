import mongoose from "mongoose";
import { DOMAIN } from "./refs";

const domainSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: [true, "Company name is required"] },
  timestamp: { type: Date, default: Date.now },
  settings: {
    customFields: {
      lead: [{
        key: { type: String, required: [true] },
        name: { type: String, required: [true] },
        label: String,
        type: { type: String, required: [true] },
        isAlwaysVisible: { type: Boolean, required: [true, true] },
        isShownInAddDialog: { type: Boolean, required: [true, false] },
        isDefault: { type: Boolean, required: [true, false] },
      }],
      contact: [{
        key: { type: String, required: [true] },
        name: { type: String, required: [true] },
        label: String,
        type: { type: String, required: [true] },
        isAlwaysVisible: { type: Boolean, required: [true, true] },
        isShownInAddDialog: { type: Boolean, required: [true, false] },
        isDefault: { type: Boolean, required: [true, false] },
      }],
      organization: [{
        key: { type: String, required: [true] },
        name: { type: String, required: [true] },
        label: String,
        type: { type: String, required: [true] },
        isAlwaysVisible: { type: Boolean, required: [true, true] },
        isShownInAddDialog: { type: Boolean, required: [true, false] },
        isDefault: { type: Boolean, required: [true, false] },
      }],
    },
    timezone: { type: String, default: "Etc/UTC" },
  },
});

export default mongoose.model(DOMAIN, domainSchema);
