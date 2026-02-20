const express =  require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");


requestRouter.post("/request/send/:status/:toUserId",userAuth, async (req,res) => {

   try{ 
   const fromUserId = req.user;  
   const status = req.params.status;
   const toUserId = req.params.toUserId;

   const allowedStatus = ["interested","ignored"];
   if(!allowedStatus.includes(status)){
    return res.status(400).json({message: "Invalid status request" + status});
   }
   const toUser = await User.findById(toUserId);
   if(!toUser){
    throw new Error("User not found");
   }
   const existingConnectionRequest = await ConnectionRequest.findOne({
    $or:[
        {fromUserId,toUserId},
        {fromUserId:toUserId,toUserId:fromUserId}
    ]
   });
   if(existingConnectionRequest){
    return res.status(500).json({message:"Connection request already exists!!!"});
   }

   const connectRequest = new ConnectionRequest({
     fromUserId,
     toUserId,
     status,
   });

   const data = await connectRequest.save();
   res.json({
    message:  "connection request send successfully",data});  
   }catch(err){
    res.status(500).send("ERROR:" + err.message);
   }
});

requestRouter.post("/request/review/:status/:requestId",userAuth,async (req,res)=>{
try{
    const loggedIn = req.user;
    const{requestId,status} = req.params;
    const allowedStatus = ["accepted","rejected"];
    if(!(allowedStatus.includes(status))){
          throw new Error("Invalid status request");
    }
    const connectionRequest = await ConnectionRequest.findOne({
        _id:requestId,
        toUserId:loggedIn._id,
        status:"interested",
        
    })
    if(!connectionRequest){
        throw new Error("Invalid Status Request");
    }
    connectionRequest.status = status;
    const data = await connectionRequest.save();
    res.send({message: "Successfully Request" + status , data})
}catch(err){
    res.status(500).json(err.message);
}


});

module.exports = requestRouter;