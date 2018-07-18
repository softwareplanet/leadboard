var express = require('express');
var router = express.Router();
var controllers = require('../controllers');

router.get('/createstage', function(req, res, next) {
	res.render('temp/createstage', {
		csrfToken: res.locals._csrf
	});
});

router.get('/createlead', function(req, res, next) {
	res.render('temp/createlead', {
		csrfToken: res.locals._csrf
	});
});

router.get('/client', function(req, res, next) {
	res.render('client', {
		csrfToken: res.locals._csrf
	});
});


// find all
router.get('/:resource', function(req, res, next) {
	getController(req.params.resource, res, function(err, controller) {
		if (err) return; //error was already sent

		controller.find({}, function(err, result) {
			if (err) {
				res.json({confirmation: 'fail', resource: err});
				return;
			}
			res.json({confirmation: 'success', resource: result});
		});
	});
});

//get by id
router.get('/:resource/:id', function(req, res, next) {
	var id = req.params.id;

	getController(req.params.resource, res, function(err, controller) {
		controller.find(req.query, function(err, result) {
			if (err) {
				res.json({confirmation: 'fail', resource: err});
				return;
			}
			res.json({confirmation: 'success', resource: result});
		});
	});
});

//create
router.post('/:resource', function(req, res, next) {
	getController(req.params.resource, res, function(err, controller) {
		controller.create(req.body, function(err, result) {
			if (err) {
				res.json({confirmation: 'fail', resource: err});
				return;
			}
			res.json({confirmation: 'success', resource: result});
		});
	});
});

function getController(action, res, callback) {
	const controller = controllers[action];

	if (controller == null) {
		res.json({confirmation: 'fail', resource: 'Invalid resource requiest:' + resource});
		callback(err);
		return;
	}
	callback(null, controller);
}

module.exports = router;
