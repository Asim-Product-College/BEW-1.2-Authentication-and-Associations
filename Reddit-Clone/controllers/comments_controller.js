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

// REPLY TO COMMENT FORM ROUTE
router.get("/comments/:commentId/replies/new", (req, res, next) => {
    res.render('replies-new', {
      post_id: req.params.postId,
      comment_id: req.params.commentId
    });
});

// CREATE REPLY ROUTE
router.post('/comments/:commentId/replies', (req, res, next) => {
    comment.create(req.body).then(newComment => {
      comment.findById(req.params.commentId).then(parentComment => {
        parentComment.replies.push(newComment._id);
        parentComment.save();
        res.redirect(`/posts/${req.params.postId}`);
      }).catch(error => {
        Promise.reject(new Error(error));
      });
    }).catch(error => {
      next(new Error(`Unable to create new reply! - ${error.message}`));
    })
  });

module.exports = router;