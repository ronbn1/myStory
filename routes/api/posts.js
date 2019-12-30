const router = require("express").Router();
const Post = require("../../models/Post");
const User = require("../../models/User");
const verifytoken = require("./verifytoken");
const { commentValidation } = require("../../validation");
const mongoose = require("mongoose");

// POST - create new post
// api/posts/
router.post("/", verifytoken, async (req, res) => {
  const user = await User.findById(req.user._id);
  try {
    // Create the new post
    const newPost = new Post({
      author: user._id,
      name: user.name,
      title: req.body.title,
      content: req.body.content
    });

    //save the new post
    const post = await newPost.save();
    //send response
    res.json(post);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

// GET - get all posts
// api/posts/
router.get("/", async (req, res) => {
  try {
    //Get post from DB
    const posts = await Post.find();
    //send response
    res.send(posts);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

// GET - get post by id
// api/posts/
router.get("/:id", async (req, res) => {
  try {
    //Get post from DB
    const post = await Post.findById(req.params.id);
    //send response
    res.send(post);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

// Get - get post's comments
// api/posts/comment/:id
router.get("/:id/comment/", verifytoken, async (req, res) => {
  try {
    //Get post from DB
    const post = await Post.findById(req.params.id);

    //send response
    res.json(post.comments);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

// Post - comment on a post
// api/posts/comment/:id
router.post("/comments/:id", verifytoken, async (req, res) => {
  //Validation the data
  const { error } = commentValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    //Get post from DB
    const post = await Post.findById(req.params.id);

    const newComment = {
      text: req.body.text,
      name: req.body.name,
      author: req.user._id,
      _id: new mongoose.Types.ObjectId()
    };

    post.comments.unshift(newComment);

    await post.save();

    //send response
    res.json(newComment);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

// Post - Like a Post
// api/posts/like/:id
router.post("/like/:id", verifytoken, async (req, res) => {
  const ObjectID = require("mongodb").ObjectID;

  try {
    //Get post from DB

    const post = await Post.findOne({ _id: new ObjectID(req.params.id) });
    const userID = req.user._id;

    if (!post.likes.includes(userID)) post.likes.unshift(userID);
    else post.likes = post.likes.filter(id => id != userID);

    res.send(post);
    await post.save();
  } catch (err) {
    res.send(err);
  }
});

//Delete - Delete a Post
//api/posts/:id
router.delete("/:id", verifytoken, async (req, res) => {
  try {
    //Get post from DB
    const posts = await Post.find();
    const post = await Post.findById(req.params.id);
    const user = await User.findById(req.user._id);

    if (post.author.toString() !== user._id.toString()) {
      return res
        .status(401)
        .json({ msg: "User not authorized to delete this post" });
    }

    post.remove();
    res.json({ msg: "Post removed" });
  } catch (err) {
    res.status(500).send(err);
  }
});

//Delete - Delete a Comment
//api/posts/:postID/:commentID
router.delete("/comments/:postID/:commentID", verifytoken, async (req, res) => {
  try {
    //Get post from DB
    const user = await User.findById(req.user._id);
    const post = await Post.findById(req.params.postID);
    const comment = post.comments.find(
      i => i._id.toString() === req.params.commentID.toString()
    );

    if (comment.author.toString() !== user._id.toString()) {
      return res
        .status(401)
        .json({ msg: "User not authorized to delete this comment" });
    }

    const updateComments = post.comments.filter(
      cur => cur._id.toString() !== comment._id.toString()
    );
    post.comments = updateComments;
    post.save();
    res.json({ msg: "Comment removed" });
  } catch (err) {
    res.status(500).send(err);
  }
});

//PUT - update a Comment
//api/posts/:postID/:commentID
router.put("/comments/:postID/:commentID", verifytoken, async (req, res) => {
  try {
    //Get post from DB
    const user = await User.findById(req.user._id);
    const post = await Post.findById(req.params.postID);
    const comment = post.comments.find(
      i => i._id.toString() === req.params.commentID.toString()
    );
    const commentIndex = post.comments.findIndex(
      obj => obj._id.toString() === req.params.commentID
    );

    if (comment.author.toString() !== user._id.toString()) {
      return res
        .status(401)
        .json({ msg: "User not authorized to update this comment" });
    }

    post.comments[commentIndex].text = req.body.text;
    post.save();
    return res.send(post);
    res.send(req.body.text);
  } catch (err) {
    console.log(err);
    res.sendStatus(500).send(err);
  }
});
module.exports = router;
