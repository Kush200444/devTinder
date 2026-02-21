const mongoose = require("mongoose");
const User = require("../models/user");
const connectDB = async() => {   
 await mongoose.connect(process.env.MONGO_KEY);
}; 
module.exports = {connectDB};
