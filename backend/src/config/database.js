const mongoose = require("mongoose");
const User = require("../models/user");
const connectDB = async() => {   
 await mongoose.connect("mongodb+srv://kush62831:GIl8qXLdPRgvbAhz@cluster0.ejgco.mongodb.net/devTinder");
}; 
module.exports = {connectDB};
