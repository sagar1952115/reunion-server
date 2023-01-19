const PostModel = require("../models/postModel.js");
const mongoose = require("mongoose");

exports.getAllPostByUser = async (req, res) => {
  console.log(req.body);
  try {
    const _id = req.params.id;
    const posts = await PostModel.find({ userId: _id });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json("Unwanted Error " + error);
  }
};
// creating a post

exports.createPost = async (req, res) => {
  const newPost = new PostModel(req.body);

  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get a post

exports.getPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await PostModel.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete a post

exports.deletePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(id);
    if (post.userId === userId) {
      await post.deleteOne();
      res.status(200).json("Post deleted.");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Like

exports.likePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(id);
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json("Post liked");
    } else {
      res.status(200).json("You have already liked the post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Dislike Post

exports.dislikePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(id);
    if (post.likes.includes(userId)) {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Post disliked");
    } else {
      res.status(200).json("You have not liked post.");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Add comments in the post

exports.addComment = async (req, res) => {
  console.log("one");
  const id = req.params.id;

  try {
    const post = await PostModel.findById(id);
    await post.updateOne({
      $push: {
        comments: {
          comment: req.body.comment,
          commenter: req.body.id,
        },
      },
    });
    res.status(200).json("Commented");
  } catch (error) {
    res.status(500).json(error);
  }
};
