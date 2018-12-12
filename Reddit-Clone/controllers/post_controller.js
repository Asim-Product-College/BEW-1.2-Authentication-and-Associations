const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const Comment = require('../models/comment')
const User = require('../models/user')

router.put('/posts/:id/vote-up', (req, res) => {
    if(req.user) {
        Post.findById(req.params.id).then(post => {
            // console.log('this is post ====> ' + post);
            post.upVotes.push(req.user._id);
            post.voteScore = post.voteScore + 1;
            return post.save();
        }).then(post => {
            return res.sendStatus(200);
        }).catch(err => {
            console.log(err.message);
        })
    } else {
        res.sendStatus(401).send('User must be signed in to do that');
    }
})
router.put("/posts/:id/vote-down", function(req, res) {
    if(req.user) {
        Post.findById(req.params.id).then(post => {
            // console.log('this is post ====> ' + post);
            post.downVotes.push(req.user._id);
            post.voteScore = post.voteScore - 1;
            return post.save();
        }).then(post => {
            return res.sendStatus(200);
        }).catch(err => {
            console.log(err.message);
        })
    } else {
        res.sendStatus(401).send('User must be signed in to do that');
    }
});

// GET index, show posts
router.get('/', (req,res) => {
    const currentUser = req.user;
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

// SUBREDDIT - what is this again?
router.get("/n/:subreddit", function(req, res) {
    const currentUser = req.user;
    Post.find({ subreddit: req.params.subreddit })
        .then(posts => {
        res.render("posts_show.hbs", { posts, currentUser });
        })
        .catch(err => {
        console.log(err);
        });
});

router.get('/posts', (req,res) => {
    const currentUser = req.user;
    res.render('posts_new', {currentUser});
});

router.post('/posts', (req,res) => {
    if (req.user) {
        currentUser  = req.user;
        console.log("we gotta user here.");
        const post = new Post(req.body);
        post.author = currentUser;
        post.save()
        User.findById(currentUser).then((user) => {
            user.posts.unshift(post);
            user.save();
            res.redirect("/posts/" + post._id);
        }).catch(err => {
            console.log(err);
        })
        // REDIRECT TO THE NEW POST
    } else {
        console.log("we gotta user, nah.");
        // alert("Signin or Signup to Post!")   - this is not defined :/
        return res.status(401); // UNAUTHORIZED
    }
});

// GET single post and it's comments
router.get('/posts/:id', (req,res) => {
    const currentUser = req.user;

    // body would be wut ur gettin from a form, query would be a url, params is right here, u specify what you're calling it.
    // query can go in get reqeusts, body is for posts (anythin u receiving fromm a form)
    Post.findById(req.params.id)
    .populate('author')
    // populate is actually returning that post
    .populate({path: 'comments', populate: {path: 'author'}})
    .then((post) => {
        res.render('single_post_show', {
            post,
            currentUser
        })
    }).catch(e => {
        console.log(e);
    });
});

module.exports = router;