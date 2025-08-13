const express = require("express");
// const app = express
const router = express.Router();
const User = require("../models/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// signup page 

router.post("/singup", async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  if (!name || !email || !password) {
    res.status(422).json({
      message: `Please fill all the fields !!`,
    });
  }
 try{
  const savedUser =User.findOne({email:email})
   
    if (savedUser) {
      res.status(404).json({
        message: `User is already exists !!`,
      })}
      const hashedpassword = await bcrypt.hash(password,12)
        const user = new User({
          name: name,
          email: email,
          password: hashedpassword,
        });
         await user.save();

        res.status(201).json({
          message :"User added successfully !!"
        })
      }catch(error){
        res.status(500).json({
          message:`internal server error : ${error}`
        })
      }
})
 

//  login page 

router.post("/login", async(req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(422).json({
      message: `Please add all the fields !!`,
    });
  }

  const dbUser =  await User.findOne({email:email})

      if (!dbUser) {
        res.status(404).json({
          message: `User is not found with this id !!`,
        });
      } else {
         jwt.sign(
          {email },
          process.env.SECRETKEY,
          function (err, token) {
            console.log(token);
          }
        );
      }
    })
  

module.exports = router;
