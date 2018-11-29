var express = require('express');
var router = express.Router();

/* GET sign up page. */
router.get('/signup', function(req, res, next) {
  res.render('signup');
});

/* POST sign up page. */
router.post('/signup', function(req, res, next) {
    console.log(req.body);
  });

module.exports = router;