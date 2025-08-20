const express = require("express");
const router = express.Router();
const User = require("../models/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRETKEY = process.env.SECRETKEY
const requireLogin = require('../middleware/requireLogin')

// signup page

router.post("/singup", async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  if (!name || !email || !password) {
    res.status(422).json({
      message: `Please fill all the fields !!`,
    });
  }
  try {
    const savedUser = User.findOne({ email: email });
    if (savedUser) {
      res.status(404).json({
        message: `User is already exists !!`,
      });
    }
    const hashedpassword = await bcrypt.hash(password, 12);
    const user = new User({
      name: name,
      email: email,
      password: hashedpassword,
    });
    await user.save();
    res.status(201).json({
      message: "User added successfully !!",
    });
  } catch (error) {
    res.status(500).json({
      message: `internal server error : ${error}`,
    });
  }
});

//  login page
 router.post('/login', (req, res)=>{
  const {email ,password }= req.body;
  if(!email || !password){
    return res.status(422).json({message : `Please fill all the fields !!`})
  }
  User.findOne({email :email}).then((dbuser)=>{
    if(!dbuser){
      return res.status(404).json({error:`User is not found with this email !!`})
    }else{
      bcrypt.compare(password , dbuser.password).then((doMatch)=>{
        if(doMatch){
          const token = jwt.sign ({_id: dbuser._id}, SECRETKEY)
          res.status(200).json({message : `Congratulations you have successfully login your account`, token})
        }
        else{
          return res.status(422).json({error:"Invalid credentials !!"})
        }
      })
    }
  })
 })

 router.get('/protected', requireLogin, (req,res)=>{
  return res.status(200).json({
    message : `access granted`
  })
 })

module.exports = router;
