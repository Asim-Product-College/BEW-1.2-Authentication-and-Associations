const { app } = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect


describe('Jayce\'s teaching me testing', () => {
    it('should return me my index page', (done) => { // research done callback
        chai.request(app)
            .get('/')
            .set('x-asim', 'is fit to be a U.S. Marine') // sets the header
            .then(function(res) {
                // console.log(res)
                expect(res).to.have.status(200) // always start with the simpliest test
                return done();
            })
            .catch(err => done(err))
    })
})

// Create
// Read
// Update
// Delete

// const Post = require("../models/post");

// describe("Posts", () => {
//   it("should create with valid attributes at POST /posts", done => {
//     // How many posts are there now?
//     Post.find(function(err, posts) {
//         var postCount = posts.count;

//         var post = {title:"post title"}
//     })
//     // Make a request to create another
//     // Check that the database has one more post in it
//     // Check that the response is a successful
//   });
// });


