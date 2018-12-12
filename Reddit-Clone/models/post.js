const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Comment = require("../models/comment");

const PostSchema = new Schema({
    // updatedAt: { type: Date },
    title: { type: String, required: true },
    url: { type: String, required: true },
    summary: { type: String, required: true },
    // comments: [Comment.Schema],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    subreddit: { type: String, required: true },
    author : { type: Schema.Types.ObjectId, ref: "User", required: true },
    upVotes: [{type: Schema.Types.ObjectId, ref: 'User'}],
    downVotes: [{type: Schema.Types.ObjectId, ref: 'User'}],
    voteScore: {type: Number, default: 0}
});

PostSchema.pre("save", function(next) {
    // SET createdAt AND updatedAt
    const now = new Date();
    this.updatedAt = now;
  
    if (!this.createdAt) {
      this.createdAt = now;
    }
  
    next();
  });
  
  module.exports = mongoose.model("Post", PostSchema);
  