var Stage = require('../models/Stage');

module.exports = {
	find: function (params, callback) {
		Stage.find(params, function(err, stages) {
			if (err) {
				callback(err, null);
				return;
			}
			callback(null, stages);
		});
	},
	findById: function (id, callback) {
		Stage.findById(id, function(err, stage) {
			if (err) {
				callback(err, null);
				return;
			}

			callback(null, stage);
		});
	},
	create: function (params, callback) {
		Stage.create(params, function(err, stage) {
			if (err) {
				callback(err, null);
				return;
			}

			callback(null, stage);
		});
	},
	update: function (params, callback) {
		Stage.findByIdAndUpdate(id, {new: true}, function(err, stage) {
			if (err) {
				callback(err, null);
				return;
			}
			callback(null, stage);
		});			
	},
	delete: function (params, callback) {
		Stage.findByIdAndRemove(id, function(err, stage) {
			if (err) {
				callback(err, null);
				return;
			}
			callback(null, null);
		});
	}
}