const express = require("express");
const Router = express.Router();
const requireLogin = require("../middleware/requireLogin");
const Post = require("../models/post");
const User = require("../models/auth");
// for all profile view 
Router.get("/profile/:id", requireLogin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const post = await Post.find({ postedBy: req.params.id });
    res.status(200).json({
      user,
      post,
    });
  } catch (err) {
    console.log(err);
  }
});
// follow route 
Router.put("/follow", requireLogin, async (req, res) => {
  try {
    const result = await User.findByIdAndUpdate(req.body.followId, {
      $push: {
        followers: req.user._id,
      },
    });
    await User.findByIdAndUpdate(
      req.user._id,
      { 
        $push: {
          following: req.body.followId,
        },
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      msg: `followed successfully !!`,
    });
  } catch (error) {
    console.log("something went wrong !!");
  }
});
// unfollow route 
Router.put("/unfollow", requireLogin, async (req, res) => {
  try {
    const result = await User.findByIdAndUpdate(req.body.unfollowId, {
      $pull: {
        followers: req.user._id,
      },
    });
    await User.findByIdAndUpdate(
      req.user._id,
      { 
        $pull: {
          following: req.body.unfollowId,
        },
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      msg: `unfollowed successfully !!`,
    });
  } catch (error) {
    console.log("something went wrong !!");
  }
});

module.exports = Router;
