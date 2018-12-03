const express = require('express');
const router = express.Router();
const Post = require('../models/post'); // but do i gotta include this here to use it!?
const Comment = require('../models/comment');
// const ObjectId = require('mongodb').ObjectId

//CREATE Comment
router.post('/posts/:postId/comments', (req, res) => {
    // instantiate instance of model
    if (req.user) {
        var comment = new Comment(req.body);
        comment.author = req.user;
        console.log("Creating:")
        console.log(req.body)
        console.log("The Comment:");
        console.log(comment);
        
        // SAVE INSTANCE OF POST MODEL TO DB
  
        Post.findById(req.params.postId).then((post) => {
            console.log("Inside finding the post");
            
          /// found a post by id
          post.comments.unshift(comment)
          return post.save()
        }).then((post) => {
          // post saved
          return comment.save()
        }).then(() => {
          // comment saved
          res.redirect('/posts/' + req.params.postId)
        }).catch((err) => {
          console.log(err.message);
        })
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