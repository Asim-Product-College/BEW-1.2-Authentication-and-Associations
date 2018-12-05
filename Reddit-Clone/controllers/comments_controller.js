const express = require('express');
const router = express.Router();
const Post = require('../models/post'); // but do i gotta include this here to use it!?
const Comment = require('../models/comment');
// const ObjectId = require('mongodb').ObjectId

//CREATE Comment
router.post('/posts/:postId/comments', (req, res, next) => {
    // instantiate instance of model
    if (req.user) {
        Comment.create(req.body).then(comment => {
            // SAVE INSTANCE OF POST MODEL TO DB
    
            Post.findById(req.params.postId).then((post) => {
                console.log("Inside finding the post");
                console.log("COMMMENT:", comment);
                /// found a post by id
                post.comments.unshift(comment._id)
                post.save()
                res.redirect(`/posts/${post._id}`);
            }).catch(error => {
                Promise.reject(new Error(error));
            });
        }).catch(error => {
            next(new Error(`Unable to create new comment! - ${error.message}`));
        });
    } else {
        return res.status(401).send('You need to be logged in to do that.');
    }
});

//new nested comments// New comments
router.get('/comments/:commentid/new',(req,res) =>{
    Comment.findById(req.params.commentid).then((comment)=>{
        res.render('comment', {comment});

    })
})

module.exports = router;