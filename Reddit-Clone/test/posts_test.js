const server = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();

chai.use(chaiHttp);

const agent = chai.request.agent(server);

// const User = require("../models/user");

before(done => {
    agent
      .post("/login")
      .send({ username: "testone", password: "password" })
      .end(function(err, res) {
        done();
      });
});