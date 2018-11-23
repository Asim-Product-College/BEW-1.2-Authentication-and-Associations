const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const Comment = require('../models/comment')

// read into mongoose methods.
router.get('/', (req,res) => {
    var currentUser = req.user;
    // find() takes an object as a condition, and a callback. An empty object in {} means look for everything.
        // Finds documents
    // OLD WAY
    // Post.find({}, function(err, posts)  {
    //     if (err) throw err;
    //     // Returns the rendered HTML of a view via the callback function.
    //     // It accepts an optional parameter that is an object containing local variables for the view.
    //     res.render('index', {posts:posts});
    // });
    Post.find({})
        .then(posts => {
            res.render("posts_show.hbs", { posts, currentUser});
        })
        .catch(err => {
            console.log(err.message);
        });
});

// SUBREDDIT
router.get("/n/:subreddit", function(req, res) {
Post.find({ subreddit: req.params.subreddit })
    .then(posts => {
    res.render("posts_show.hbs", { posts });
    })
    .catch(err => {
    console.log(err);
    });
});

router.get('/posts/new', (req,res) => {
    res.render('posts_new');
});

router.post('/posts/new', (req,res) => {
    if (req.user) {
        console.log("we gotta user here.");
        
        const post = new Post(req.body);
        post.author = req.user._id;
        post.save((err, post) => {
            user.posts.unshift(post);
            user.save();
            // REDIRECT TO THE NEW POST
            res.redirect("/posts/" + post._id);
        })
    } else {
        console.log("we gotta user, nah.");
        // alert("Signin or Signup to Post!")   - this is not defined :/
        return res.status(401); // UNAUTHORIZED
    }
});

router.get('/posts/:id', (req,res) => {
    // body would be wut ur gettin from a form, query would be a url, params is right here, u specify what you're calling it.
    // query can go in get reqeusts, body is for posts (anythin u receiving fromm a form)
    Post.findById(req.params.id).populate('comments').then((post) => {
        res.render('single_post_show', { post });
    })
        .catch(console.err)
});

///Connor testing
// router.get('/posts/:id', (req, res) => {
//     Post.findById(req.params.id).then(post => {
//         res.render('posts-show', {post: post});
//     }).catch(console.error)
// })




module.exports = router;