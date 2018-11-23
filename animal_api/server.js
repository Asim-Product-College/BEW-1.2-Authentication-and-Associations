const app = require('express')();
const router = require('express')(Router);

// set up express for json response
app.use(express.json());

// zoo collection
const zoos = [];

// animal collection
const animals = [];

// zoo model
const zoo = {
  id: 0,
  name: ""
}

// animal model
const animal = {
  id: 0,
  name: "",
  type: ""
};

// gets all zoos
router.get('/zoos', (req, res) => {
  res.json(zoos);
});

// gets a single zoo
router.get('/zoos/:id', (req, res) => {
  try {
    res.json(zoo[req.params.id]);
  } catch (e) {
    res.json({
      "message": e
    });
  }
});

/*
  
*/

// use our routes
app.use('/api', router)

// start app
app.listen('5000', () => {
  console.log('App started on Port 5000');
});
