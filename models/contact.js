
import mongoose from "mongoose";
import { CONTACT, DOMAIN, ORGANIZATION, USER } from "./refs";

// Person
const contactSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  organization: { type: mongoose.Schema.Types.ObjectId, ref: ORGANIZATION },
  custom: [{ key: mongoose.Schema.Types.ObjectId, value: "string" }],
  domain: { type: mongoose.Schema.Types.ObjectId, required: true, ref: DOMAIN },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: USER },
  timestamp: { type: Date, default: Date.now },
});

const organizationPopulates = [{ path: "organization", select: "name" }];
const ownerPopulates = [{ path: "owner", options: { password: 0 } }];

const fullPopulates = [
  ...organizationPopulates,
  ...ownerPopulates,
];

contactSchema.statics.populates = {
  full: fullPopulates,
};

export default mongoose.model(CONTACT, contactSchema);