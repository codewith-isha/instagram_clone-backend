const express = require("express");
const router = express.Router();
const requireLogin = require("../middleware/requireLogin");
const Post = require("../models/post");
const user = require("../models/auth");
// creatig post
router.post("/createpost", requireLogin, async (req, res) => {
  const { title, body, photos } = req.body;
  if (!title || !body || !photos) {
    res.status(203).json({
      message: ` Please fill all the fields !!`,
    });
  } else {
    const post = new Post({
      title: title,
      body: body,
      photos: photos,
      postedBy: req.user,
    });
    await post.save();
    res.status(201).json({
      message: ` Post added successfully !!`,
    });
  }
});
// gettiing my post
router.get("/mypost", requireLogin, async (req, res) => {
  const myPost = await Post.findOne();
  res.status(200).json(myPost);
});
// getting all post
router.get("/allpost", requireLogin, async (req, res) => {
  const allpost = await Post.find();
  res.status(200).json(allpost);
});

module.exports = router;
