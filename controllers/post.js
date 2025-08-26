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
// post like route 
router.post("/like", requireLogin, async (req,res)=>{
  try{
  const result= await Post.findByIdAndUpdate(req.body.postId,{
    $push :{
      likes: req.user._id,
    },
  },
  {
    new:true
  },
  await res.status(200).json({
    msg:`Post Liked By ${req.user.name}`
  })
)
  }catch(err){
    res.status(404).json({
      msg :`something went wrong!!`
    })
  }
})

// unlike post route 
router.post("/unlike", requireLogin, async (req,res)=>{
  try{
  const result= await Post.findByIdAndUpdate(req.body.postId,{
    $pull :{
      likes: req.user._id,
    },
  },
  await res.status(200).json({
    msg:`Post Unliked By ${req.user.name}`
  })
)
  }catch(err){
    res.status(404).json({
      msg :`something went wrong!!`
    })
  }
})
// comment route 
router.post("/comment" , requireLogin ,async(req, res)=>{
try{
  const result = await Post.findByIdAndUpdate(
    req.body.postId,{
     $push:{
     comments:{
      text:req.body.text,
     postedBy :req.user._id
    },
   },
  },
  {
    new:true,
  })
  await res.status(200).json({
  msg:`comment added successfully !!`,
  result
})
  
}
  catch(err){
  res.status(404).json({
    msg :`Something went wrong !!`
  })
}
})
// delete route 
// router.delete("/deletepost/:postId", requireLogin , async(req,res)=>{
//   const {postId} = req.params
//  try {
//   const result =await Post.findByIdAndDelete(
//    { 
//     _id: postId,
//     postedBy:req.user._id,
// })
//   res.status(200).json({
//     msg :`Post deleted successfully`
//   })
// }catch(err){
//   console.log("Something went wrong !!")
// }
// })

module.exports = router;
