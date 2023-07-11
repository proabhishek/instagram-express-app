const express = require('express');
const mongoose = require('mongoose');
const postRouter = express.Router();
const Post = mongoose.model('Post');
const isLoggedIn = require('../middlewares/isLoggedIn');  
const sendResponse = require('../utilities/response');

postRouter.post('/create', isLoggedIn, async (req, res) => {
    const { text, image } = req.body;

    if (!text && !image) {
        return sendResponse(res, false, 'Please provide text or an image for the post', null, 400);
    }

    try {
        const newPost = new Post({
            text: text,
            image: image,
            user: req.user._id
        });

        const savedPost = await newPost.save();

        return sendResponse(res, true, 'Post created successfully', savedPost, 201);

    } catch (err) {
        console.error(err);
        return sendResponse(res, false, 'Server error', null, 500);
    }
});

postRouter.put('/update/:id', isLoggedIn, async (req, res) => {
    const { text, image } = req.body;

    // You can decide whether you want to allow both fields to be empty during update
    if (text === undefined && image === undefined) {
        return sendResponse(res, false, 'Nothing to update', null, 400);
    }

    try {
        // Find the post by id
        let post = await Post.findById(req.params.id);

        // Check if post exists
        if (!post) {
            return sendResponse(res, false, 'Post not found', null, 404);
        }

        // Check if the logged-in user is the author of the post
        if (post.user.toString() !== req.user._id.toString()) {
            return sendResponse(res, false, 'User not authorized to update this post', null, 401);
        }

        // Update the post
        if (text !== undefined) {
            post.text = text;
        }
        if (image !== undefined) {
            post.image = image;
        }

        const updatedPost = await post.save();

        return sendResponse(res, true, 'Post updated successfully', updatedPost);

    } catch (err) {
        console.error(err);
        return sendResponse(res, false, 'Server error', null, 500);
    }
});


postRouter.delete('/delete/:id', isLoggedIn, async (req, res) => {
    try {
        // Find the post by id
        let post = await Post.findById(req.params.id);

        console.log(post);
        

        // Check if post exists
        if (!post) {
            return sendResponse(res, false, 'Post not found', null, 404);
        }

        // Check if the logged-in user is the author of the post
        if (post.user.toString() !== req.user._id.toString()) {
            return sendResponse(res, false, 'User not authorized to delete this post', null, 401);
        }

        // Delete the post
        await post.deleteOne({ _id: post._id});

        return sendResponse(res, true, 'Post deleted successfully');

    } catch (err) {
        console.error(err);
        return sendResponse(res, false, 'Server error', null, 500);
    }
});

postRouter.get('/view/:id', isLoggedIn, async (req, res) => {
    try {
        // Find the post by id
        let post = await Post.findById(req.params.id);

        // Check if post exists
        if (!post) {
            return sendResponse(res, false, 'Post not found', null, 404);
        }

        // Check if the logged-in user is the author of the post
        if (post.user.toString() !== req.user._id.toString()) {
            return sendResponse(res, false, 'User not authorized to view this post', null, 401);
        }

        // Send the post as a response
        return sendResponse(res, true, 'Post retrieved successfully', post);

    } catch (err) {
        console.error(err);
        return sendResponse(res, false, 'Server error', null, 500);
    }
});


postRouter.get('/my-posts', isLoggedIn, async (req, res) => {
    try {
        // Find all the posts by the logged-in user
        let posts = await Post.find({ user: req.user._id });

        // Send the posts as a response
        return sendResponse(res, true, 'Posts retrieved successfully', posts);

    } catch (err) {
        console.error(err);
        return sendResponse(res, false, 'Server error', null, 500);
    }
});






module.exports = postRouter;
