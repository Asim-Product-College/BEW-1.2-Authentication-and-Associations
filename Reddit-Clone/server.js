require('dotenv').config();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const express = require('express')
const path = require('path') // research the path native node module
const app = express();
const exphbs = require('express-handlebars');
// const methodOverride = require('method-override') //what'd is doo idk duu
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000
app.use(cookieParser());

// view engine setup
// app.set('views', path.join(__dirname, 'views'));

app.engine('hbs', exphbs({
  defaultLayout: "main",
  extname: ".hbs",
  helpers: require("handlebars-helpers")(),
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));
app.set('view engine', 'hbs');

// database connection
require('./data/reddit-clone-db');

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(expressValidator());
// Add after body parser initialization!
// controllers here

var checkAuth = (req, res, next) => {
  console.log("Checking authentication");
  if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
    req.user = null;
  } else {
    var token = req.cookies.nToken;
    var decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }
  next();
};
app.use(checkAuth);

const postRouter = require('./controllers/post_controller');
const commentsRouter = require('./controllers/comments_controller');
const authRouter = require('./controllers/auth');
const repliesRouter = require('./controllers/replies');

// app.use should be stricly for middleware ;/
app.use(postRouter);
app.use('/', commentsRouter);
app.use(authRouter);
app.use('/', authRouter);
app.use('/', repliesRouter);


app.listen(port, () =>{
    console.log(`Server is listening on ${port}`);
});


module.exports = app;