const mongoose = require("mongoose");
const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true, 
        ref:"User",
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["ignored","accepted","rejected","interested"],
            message: `{VALUE} is incorrect status type`,
        },
        ref:"User",
    }
},{
    timestamps:true,
}); 

connectionRequestSchema.index({fromUserId:1,toUserId:1}); 
connectionRequestSchema.pre("save", function(){
    const ConnectionRequest = this;
    if(ConnectionRequest.fromUserId.equals(ConnectionRequest.toUserId)){
        throw new Error("Cannot send the request to yourself");
    };
})
module.exports = mongoose.model(
    "ConnectionRequest",
    connectionRequestSchema
);