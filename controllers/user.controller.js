const UserModel = require("../models/user.model");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken")

const addUser = (req, res) => {
  let form = new userModel(req.body);
  form
    .save()
    .then(() => {
      console.log("User saved");
      res.send({ status: true, message: "User Added Successfully" });
    })
    .catch((error) => {
      console.log(error);
      res.send({status: false, message: "user not saved"})
    });
};

const authenticateUser = (req, res)=>{
  console.log(req.body)
  let {password} = req.body
  userModel.findOne({email:req.body.email})
  .then((user)=>{
    console.log(user)
    if(user){
        //email is valid
        user.validatePassword(password, (err,same)=>{
          console.log(password)
          if(!same){
            res.send({status:false, message: "Invalid Credentials"})
          }else{
            let token=jwt.sign({email:req.body.email}, process.env.JWT_SECRET, {expiresIn:"3s"})
            console.log(token)
            
            res.send({status:true, message: "Valid Credentials", token})

          }
        })
    }else{
      res.send({status:false, message: "Invalid Credentials"})
    }
  })
  .catch((error)=>{
    console.log(error)
  })
}

const getDashboard = (req,res) =>{
  let token = req.headers.authorization.split(" ")[1]
  console.log(token)
  jwt.verify(token, process.env.JWT_SECRET, (err, result)=>{
    if(err){
      console.log(err)
      res.send({status:false, message: "Token expired or Invalid"})
    }else{
      console.log(result)
      let email = result.email
      UserModel.findOne({email:email}).
      then((user)=>{
        res.send({status:true, message: "Token is Valid", user})
        console.log(user)
      })
    }
  })
}

module.exports = { addUser, authenticateUser, getDashboard };
