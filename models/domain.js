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
        type: { type: String, required: [true] },
        isAlwaysVisible: { type: Boolean, required: [true, true] },
        isShownInAddDialog: { type: Boolean, required: [true, false] },
        isDefault: { type: Boolean, required: [true, false] },
      }],
      contact: [{
        key: { type: String, required: [true] },
        name: { type: String, required: [true] },
        type: { type: String, required: [true] },
        isAlwaysVisible: { type: Boolean, required: [true, true] },
        isShownInAddDialog: { type: Boolean, required: [true, false] },
        isDefault: { type: Boolean, required: [true, false] },
      }],
      organization: [{
        key: { type: String, required: [true] },
        name: { type: String, required: [true] },
        type: { type: String, required: [true] },
        isAlwaysVisible: { type: Boolean, required: [true, true] },
        isShownInAddDialog: { type: Boolean, required: [true, false] },
        isDefault: { type: Boolean, required: [true, false] },
      }],
    },
    timezone: { type: String, default: "Etc/UTC" },
  },
});

domainSchema.pre("save", function(next) {
  let domain = this;

  if (domain.isNew) {
    domain.settings = {
      customFields: createDefaultCustomFields(),
    };
  }
  next();
});

const createDefaultCustomFields = () => {
  return {
    lead: [],
    contact: [
      {
        key: "phone",
        name: "Phone",
        type: "string",
        isAlwaysVisible: true,
        isShownInAddDialog: false,
        isDefault: true,
      },
      {
        key: "email",
        name: "Email",
        type: "string",
        isAlwaysVisible: true,
        isShownInAddDialog: false,
        isDefault: true,
      },
    ],
    organization: [
      {
        key: "address",
        name: "Address",
        type: "string",
        isAlwaysVisible: true,
        isShownInAddDialog: false,
        isDefault: true,
      },
    ],
  };
};

export default mongoose.model(DOMAIN, domainSchema);
