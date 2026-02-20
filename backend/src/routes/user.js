const express = require("express");
const userRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const { Connection } = require("mongoose");
const USER_SAFE_DATA = "firstName lastName gender age about photoUrl";
const User = require("../models/user")
userRouter.get("/user/requests/recieved",userAuth, async (req,res)=>{
   try{
    const loggedIn = req.user;
    const connectionRequest = await ConnectionRequest.find({
       toUserId:loggedIn._id,
       status:"interested"
    }).populate("fromUserId",["firstName","lastName","photoUrl","gender","age"])

    res.json({
       message: "Data fetched Successfully",
       data:connectionRequest        
    })
   
  }catch(err){S
    res.status.json({message: err.message});
  }
});

userRouter.get("/user/connections", userAuth, async (req,res) => {
  try{
   const loggedIn = req.user;
   const connectionAccepted = await ConnectionRequest.find({
    $or:[
        {toUserId:loggedIn._id,status:"accepted"},
        {fromUserId:loggedIn._id,status:"accepted",}
    ]
   }).populate("fromUserId",USER_SAFE_DATA)
     .populate("toUserId",USER_SAFE_DATA);

     console.log(connectionAccepted);
   
  const data = connectionAccepted.map((row) => {
    if(row.fromUserId._id.toString() === loggedIn._id.toString()){
        return row.toUserId;
    }
        return row.fromUserId;
  });
   res.json( data);
  }catch(err){
    res.json({message: err.message});
  }
});
userRouter.get("/user/feed", userAuth, async (req,res) =>{
  try{
    const page = req.query.page || 1;
    let limit = req.query.limit || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1)* limit; 
    const loggedIn = req.user;
    const userFeed = await ConnectionRequest.find({
      $or:[
        {fromUserId:loggedIn._id},{toUserId:loggedIn._id}
      ]
    }).select("fromUserId toUserId").populate("fromUserId","firstName").populate("toUserId","firstName");
    const hideUsersFromFeed = new Set();
    userFeed.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId._id.toString());
      hideUsersFromFeed.add(req.toUserId._id.toString());
    })
    console.log(hideUsersFromFeed);
    const user = await User.find({
      $and:[
        {_id:{$nin: Array.from(hideUsersFromFeed)}},
        {_id:{$ne:loggedIn._id}}
      ]
    }).select(USER_SAFE_DATA)``
      .skip(skip)
      .limit(limit);

    res.json({message: "data fetched successfully",user});
  }catch(err){
    res.json({message:err.message});
  }
});
module.exports = userRouter;