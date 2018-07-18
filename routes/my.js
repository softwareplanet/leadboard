var express = require('express');
var router = express.Router();

router.get('/my/:test', function(req, res, next) {
  console.log(req.params.test);
  res.json({
  	confirmation: 'fail',
  	resource: 'Invalid resource requiest:' + req.params.test
  });
});

module.exports = router;
