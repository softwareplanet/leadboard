import mongoose from "mongoose";
import QueryPlugin from "mongoose-query";

const activitySchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Call", "Meeting", "Task", "Deadline", "Email", "Lunch"],
    default: "Call",
  },
  domain: { type: mongoose.Schema.Types.ObjectId, required: true },
  subject: { type: String, default: "Call" },
  date: { type: Date, default: Date.now },
  hasStartTime: { type: Boolean, default: false },
  duration: { type: Number },
  note: { type: String, default: "" },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  lead: { type: mongoose.Schema.Types.ObjectId, ref: "Lead" },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Contact" }],
  organization: { type: mongoose.Schema.Types.ObjectId, ref: "Organization" },
  done: { type: Boolean, default: false },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  lastEditor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
activitySchema.plugin(QueryPlugin);
const mailingPopulates = [
  { path: "assignedTo", populate: { path: "domain" } },
  { path: "lead" },
];

activitySchema.statics.populates = {
  mailing: mailingPopulates,
};

export default mongoose.model("Activity", activitySchema);
