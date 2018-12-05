var express = require('express');
var router = express.Router();
const User = require('../models/user');

/* GET start page. */
router.get('/signup', function(req, res, next) {
  const currentUser = req.user;
  if (req.user) {
      res.redirect('dashboard');
  } else {
      res.render('signup');
  }
});  

// SIGN UP POST
router.post("/signup", (req, res) => {
  // Create User and JWT
  const user = new User(req.body);
  user.save().then((user) => {
      const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "60 days" });
      console.log("token:", token);
      // set the cookie when someone signs up and logs in
      res.cookie('nToken', token, { maxAge: 600000, httpOnly: true });
      
      res.redirect("/dashboard");
  })
  .catch(err => {
      console.log(err.message);
      return res.status(400).send({ err: err });
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;