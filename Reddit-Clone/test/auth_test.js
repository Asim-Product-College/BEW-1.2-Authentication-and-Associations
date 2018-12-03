const server = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
chai.use(chaiHttp);

const agent = chai.request.agent(server);

const User = require("../models/user");

describe("User", function() {
    // not signup
    it("should not be able to login if they have not registered", done => {
        agent.post("/login", { email: "wrong@wrong.com", password: "nope" }).end(function(err, res) {
          res.status.should.be.equal(401);
          done();
        });
      });
    
      // signup
    it("should be able to signup", done => {
        User.findOneAndRemove({ username: "testone" }, function() {
        agent
            .post("/sign-up")
            .send({ username: "testone", password: "password" })
            .end(function(err, res) {
            console.log(res.body);
            res.should.have.status(200);
            res.should.have.cookie("nToken");
            done();
            });
        });
    });
    
    // logout
    it("should be able to logout", done => {
        agent.get("/logout").end(function(err, res) {
        res.should.have.status(200);
        res.should.not.have.cookie("nToken");
        done();
        });
    });

    // login
    it("should be able to login", done => {
        agent
        .post("/login")
        .send({ username: "awesome", password: "Test1234" })
        .end(function(err, res) {
            res.should.have.status(200);
            res.should.have.cookie("nToken");
            done();
        });
    });
});