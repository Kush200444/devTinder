const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt =require("bcrypt");
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4, 
        maxLength:100,
    },
    lastName:{
     type:String,
    },
    emailId:{
        type:String,
        required:true,
        index:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email not valid" + value);
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password is not strong: " + value);
            }
        }
    },      
    age:{
        type:Number,
        min:18,
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new error("Gender is not valid");
            }
        },
    },
    photoUrl:{
        type:String,
        default:"https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?semt=ais_hybrid&w=740&q=80",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("URL not valid: " + value);
            }
        }
    },
    skills:{
        type:[String], 
    },
    about:{
        type:String,
        default:"this is the default about of the user"
    }
},{
    timestamps:true
});

userSchema.methods.getJWT = async function(){
    const user = this;
    const token = await jwt.sign({_id:user._id},"Kush@12345",{expiresIn:"1d"});
    return token;
};

userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user = this;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser,user.password);
    return isPasswordValid;
}
 
module.exports = mongoose.model("User",userSchema);