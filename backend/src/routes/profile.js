const express = require("express");
const { userAuth } = require("../middlewares/auth");
const profileRouter = express.Router();
const User = require("../models/user");
const cookieParser = require("cookie-parser");
const { validateUserEditData, validateSignUpData } = require("../utils/validate");
const bcrypt =require("bcrypt");
const app = express();
app.use(express.json());
app.use(cookieParser());
const validator = require("validator");

profileRouter.get("/profile/view",userAuth,async (req,res)=>{
    try{ 
      const user = req.user;      
      res.send(user);
    }catch(err){
        res.status(400).send("ERROR : " + err.message);
    };
});
profileRouter.patch("/profile/edit", userAuth, async (req,res) => {
     try{
      if(!validateUserEditData(req)){
        throw new Error("Invalid Update request");
      }
      const user = req.user;  
      Object.keys(req.body).forEach((key)=>(user[key] = req.body[key]));
      await user.save();
      res.json({message:`${user.firstName}, your profile was updated successfully`,data:user});        
      }catch(err){
        res.status(400).send(err.message);
      };
});
profileRouter.patch("/profile/forgetpassword",userAuth, async (req,res)=>{
    try{
      const{oldPassword,newPassword} = req.body;  
      const user = req.user; 
      const isPasswordValid = await user.validatePassword(oldPassword);
      if(!isPasswordValid){
        throw new Error("Invalid password");
      }   
       if(!(validator.isStrongPassword(newPassword))){
          throw new Error("not a Enough strong password");
       }
       const newPasswordHash = await bcrypt.hash(newPassword,10);
        user.password = newPasswordHash;
       await user.save();
       res.json({message: `${user.firstName}, your password was updated successfully`,data:user})
    }catch(err){
        res.status(404).send("ERROR:" + err.message);
    }
});
module.exports = profileRouter; 