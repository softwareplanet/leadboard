var express = require('express');
var router = express.Router();

router.get('/createstage', function(req, res, next) {
	console.log('token:' + res.locals._csrf);
	res.render('temp/createstage', {
		csrfToken: res.locals._csrf
	});
});

module.exports = router;
