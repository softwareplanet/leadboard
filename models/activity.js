import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Call", "Meeting", "Task", "Deadline", "Email", "Lunch"],
    default: "Call"
  },
  subject: { type: String, default: "Call" },
  date: { type: Date, default: Date.now },
  duration: { type: Number },
  note: { type: String, default:""},
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  lead: { type: mongoose.Schema.Types.ObjectId, ref: "Lead", default: ""},
  participants:  [{type: mongoose.Schema.Types.ObjectId, ref:"Contact"}],
  organization: {type: mongoose.Schema.Types.ObjectId, ref: "Organoztion"},
  done: {type: Boolean, default: false},
});

module.exports = mongoose.model("Activity", activitySchema);
