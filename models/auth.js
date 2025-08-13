const { default: mongoose } = require('mongoose')
const moongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const Userschema = new mongoose.Schema(
  {
    name:{
      type:String,
      required:true,
    },
    email:{
      type:String,
      required:true,
    },
    password:{
      type:String,
      required:true,
    },
    pic:{
      type:String,
     default:"https://img.freepik.com/premium-vector/young-man-avatar-character-due-avatar-man-vector-icon-cartoon-illustration_1186924-4438.jpg"
    },
    followers:[
      {
        type:ObjectId,
        ref:"User",
      },
    ],
    following:[
      {
        type:ObjectId,
        ref:"User"
      },
    ],

  },
  {
    timestamps:true,
  }
);
module.exports = moongoose.model("User" , Userschema)