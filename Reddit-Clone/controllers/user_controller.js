const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const User = require('../models/user')

// GET /user/:id
User.get('user/:id', (req,res) => {
    // Find the user by id
        // render a user page and populate it with their posts.
});