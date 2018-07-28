const mongoose = require('mongoose');

const domainSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {type: String, required: [true, 'Company name is required']},
  timestamp: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Domain', domainSchema);
