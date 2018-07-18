const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
	stage_id: String,
	owner_id: String,
	visibility: Number,
	name: String,
	contact_id: String,
	timestamp: {type:Date, default:Date.now}
});

module.exports = mongoose.model('LeadSchema', LeadSchema);
