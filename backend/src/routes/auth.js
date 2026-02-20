const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validate");
const cookieParser = require("cookie-parser");
const validator = require("validator");
const bcrypt =require("bcrypt");
const User = require("../models/user");
const app = express();
app.use(express.json());
app.use(cookieParser());


authRouter.post("/signup", async (req,res) => {
 // Creating new instance of the 'User' model 
const data = req.body;
try{
validateSignUpData(req);
const {firstName,lastName,emailId,password} = req.body;
const passwordHash = await bcrypt.hash(password,10);
console.log(passwordHash);
const user =  new User({
  firstName,
  lastName,
  emailId,
  password:passwordHash
});
if(data?.skills.length>10){
    throw new Error("Skills cannot be more than 10")
 };
 await user.save();         
 res.send("user added Sucessfully");
}
catch(err){
    res.status(401).send(err.message);
}});

authRouter.post("/login", async function(req,res){
  try{
  const{emailId,password} = req.body;
  if(!validator.isEmail(emailId)){
    throw new Error("Email not valid");
  }
  const user = await User.findOne({emailId:emailId});
  if(!user){
   throw new Error("Invalid Credentials");
  }
  const isPasswordValid = await user.validatePassword(password);
  if(!isPasswordValid){
    throw new Error("Invalid Credentials");
  }
  else{
     const token = await user.getJWT();
     res.cookie("token",token); 
     res.send("You are logged In!!!")
  }; 
  }catch(err){
    res.status(401).send(err.message);
  }
});

authRouter.post("/logout", async (req,res) => {
    try{
      res.clearCookie("token");
      res.send("You have been logged out");
    }catch(err){
        res.status(400).send("ERROR: " + err.message);
    }

});

module.exports = authRouter;