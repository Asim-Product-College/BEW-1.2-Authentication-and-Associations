const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    author : {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: false
    },
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }
}, {timestamps: true});
//   first find it's replies
CommentSchema.pre('find', function(next) {
    this.populate('author').populate('replies');
    next();
  });

module.exports = mongoose.model("Comment", CommentSchema);
  
// the way we're architecturing this is for every comment to have an associated post.
// when we load every post we'll go through our comments and also load it's comments
// OTHER APPROACH
// every post should have a list of comments as well... no? So like array of comments.
// comments are created in the air and actually they have a parent postid and each
// post has it's array of comments as well - what case is best? GODS PLANS IDFK