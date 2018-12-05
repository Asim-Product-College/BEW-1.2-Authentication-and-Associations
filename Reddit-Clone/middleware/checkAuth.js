const User = require('../models/user');
const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    console.log("Checking authentication");
    if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
      req.user = null;
      return next();
    } else {
      var token = req.cookies.nToken;
      var decodedToken = jwt.decode(token, { complete: true }) || {};
      if (decodedToken.payload) {
          console.log(decodedToken.payload);
          User.findById(decodedToken.payload._id).then(user => {
            req.user = decodedToken.payload._id;
            res.locals.authenticatedUser = user;
            console.log('Here is the logge in user:',user);
            return next();
          });
      }
    }
    
};