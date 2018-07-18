var Stage = require('../models/Lead');

module.exports = {
	find: function (params, callback) {
		Stage.find(params, function(err, leads) {
			if (err) {
				callback(err, null);
				return;
			}
			callback(null, leads);
		});
	},
	findById: function (id, callback) {
		Stage.findById(id, function(err, lead) {
			if (err) {
				callback(err, null);
				return;
			}

			callback(null, lead);
		});
	},
	create: function (params, callback) {
		Stage.create(params, function(err, lead) {
			if (err) {
				callback(err, null);
				return;
			}

			callback(null, lead);
		});
	},
	update: function (params, callback) {
		Stage.findByIdAndUpdate(id, {new: true}, function(err, lead) {
			if (err) {
				callback(err, null);
				return;
			}
			callback(null, lead);
		});
	},
	delete: function (params, callback) {
		Stage.findByIdAndRemove(id, function(err, lead) {
			if (err) {
				callback(err, null);
				return;
			}
			callback(null, null);
		});
	}
}
