const mongoose = require('mongoose');

const StageSchema = new mongoose.Schema({
	funnel_id: String,
	name: String,
	timestamp: {type:Date, default:Date.now}
});

module.exports = mongoose.model('StageSchema', StageSchema);
