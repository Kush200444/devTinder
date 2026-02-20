const validator = require("validator");

const validateSignUpData = function(req){
    const {firstName,emailId,password} = req.body;
    if(!firstName ){
        throw new Error("Please enter the first name");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter the strong password");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Email not valid");
    }
};

const validateUserEditData = async function(req){
      const ALLOWED_UPDATES = ["photoUrl",
                               "age",
                               "gender",
                               "skills",
                               "about"
                               ];
      const isUpdateAllowed = Object.keys(req.body).every((field)=>ALLOWED_UPDATES.includes(field));  
      if(!isUpdateAllowed){
        throw new Error("Invalid Update request");
}
}        
module.exports = {validateSignUpData,validateUserEditData};