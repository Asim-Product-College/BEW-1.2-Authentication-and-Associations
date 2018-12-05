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
            comment.author = req.user;
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
router.get("/posts/:postId/comments/:commentId/replies/new", (req, res, next) => {
    res.render('replies-new', {
      post_id: req.params.postId,
      comment_id: req.params.commentId
    });
});

// CREATE REPLY ROUTE
router.post('/posts/:postId/comments/:commentId/replies', (req, res, next) => {
    // req.body.author = "5c07816e5a06893636446d95";
    console.log("req.user:", req.user);
    
    console.log("Req Body:", req.body);
    Comment.create(req.body).then(newComment => {
        console.log("at line 44");
        newComment.author = req.user;
        console.log("newComment:", newComment);
      Comment.findById(req.params.commentId).then(parentComment => {
          console.log("parentComment:", parentComment);          
        parentComment.replies.push(newComment._id);
        parentComment.save();
        // i don't think this redirect will work bc req.params doesn't have a post id
        res.redirect(`/posts/${req.params.postId}`);
      }).catch(error => {
        Promise.reject(new Error(error));
      });
    }).catch(error => {
      next(new Error(`Unable to create new reply! - ${error.message}`));
    })
  });

module.exports = router;