const express = require('express');
const router = express.Router();
const Post = require('../models/post'); //yo but do i gotta include this here to use it lol!?
const Comment = require('../models/comment');
// const ObjectId = require('mongodb').ObjectId

//CREATE Comment
router.post('/posts/:postId/comments', (req, res) => {
    console.log("WE ARE IN THIS COMMENT ROUTE NOW");
    // instantiate instance of model
    console.log("HELPER: req.body of create comment route is:",req.body);
    if (req.user) {
        const comment = new Comment(req.body)
        comment.author = req.user._id;
        // save instance of Comment model to db - this is the syntax that i do not know.
        comment.save().then(comment => {
            // find parent post id by url parameter
            return Post.findById(req.params.postId);
        }).then(post => {
            // add the comment to the array of comments within the post using unshift so it
            // adds the comment to the beggining of the array so newest comments appear first!
            post.comments.unshift(comment);
            // save this new post that we've updated :)))))
            return post.save();
        }).then(post => {
            // finally let's redirect this page now that we've done what we wanna :D
            res.redirect('/posts/' + post._id);
        }).catch(console.err);
    } else {
        return res.status(401).send('You need to be logged in to do that.');
    }
});

module.exports = router;