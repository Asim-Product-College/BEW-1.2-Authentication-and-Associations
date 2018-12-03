const express = require('express');
const router = express.Router();
const Post = require("../models/post");
const Comment = require("../models/comment");
const User = require("../models/user");

// NEW REPLY
router.get("/posts/:postId/comments/:commentId/replies/new", (req, res) => {
    let post;
    Post.findById(req.params.postId)
    .then(p => {
        post = p;
        return Comment.findById(req.params.commentId);
    })
    .then(comment => {
        res.render("replies-new", { post, comment });
    })
    .catch(err => {
        console.log(err.message);
    });
});

// CREATE REPLY
router.post("/posts/:postId/comments/:commentId/replies", (req, res) => {
    console.log(req.body);
});

// CREATE REPLY
router.post("/posts/:postId/comments/:commentId/replies", (req, res) => {
    // LOOKUP THE PARENT POST
    Post.findById(req.params.postId)
      .then(post => {
        // FIND THE CHILD COMMENT
        const comment = post.comments.id(req.params.commentId);
        // ADD THE REPLY
        comment.comments.unshift(req.body);
        // SAVE THE CHANGE TO THE PARENT DOCUMENT
        return post.save();
      })
      .then(post => {
        // REDIRECT TO THE PARENT POST#SHOW ROUTE
        res.redirect("/posts/" + post._id);
      })
      .catch(err => {
        console.log(err.message);
      });
  });

module.exports = router;