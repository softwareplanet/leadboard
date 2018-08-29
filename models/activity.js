import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Call", "Meeting", "Task", "Deadline", "Email", "Lunch"],
    default: "Call"
  },
  subject: { type: String, default: "Call" },
  date: { type: Date, default: Date.now },
  hasStartTime: {type: Boolean, default:false},
  duration: { type: Number },
  note: { type: String, default:""},
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
  lead: { type: mongoose.Schema.Types.ObjectId, ref: "Lead"},
  participants:  [{type: mongoose.Schema.Types.ObjectId, ref:"Contact"}],
  organization: {type: mongoose.Schema.Types.ObjectId, ref: "Organoztion"},
  done: {type: Boolean, default: false},
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
  modifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Activity", activitySchema);
