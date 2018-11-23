const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    // updatedAt: { type: Date },
    // parentPost: { type: String, required: true },
    content: { type: String, required: true },
    author : { type: Schema.Types.ObjectId, ref: "User", required: true }
});
  
module.exports = mongoose.model("Comment", CommentSchema);
  
// the way we're architecturing this is for every comment to have an associated post.
// when we load every post we'll go through our comments and also load it's comments
// OTHER APPROACH
// every post should have a list of comments as well... no? So like array of comments.
// comments are created in the air and actually they have a parent postid and each
// post has it's array of comments as well - what case is best? GODS PLANS IDFK