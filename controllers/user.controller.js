const userModel = require("../models/user.model");

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
  userModel.findOne({email:req.body.email})
  .then((response)=>{
    console.log(response)
  })
  .catch((error)=>{
    console.log(error)
  })
}

module.exports = { addUser, authenticateUser };
