const mongoose = require("mongoose");

const LeadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    enum: ["website", "referral", "ads"],
    required: true,
  },
  status: {
    type: String,
    enum: ["new", "in-progress", "converted", "lost"],
    default: "new",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Lead", LeadSchema);
