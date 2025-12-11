const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
//User Schema
const UserSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  createdAt: {type: Date, default: Date.now },
});

let saltRound = 10
UserSchema.pre("save", function(next){
  bcrypt.hash(this.password, saltRound, (err, hashedPassword)=>{
    console.log(this.password)
    if(err){
      console.log(err, "password could not be hashed")
    }
    else{
      this.password = hashedPassword
      console.log(hashedPassword)
      next()
    }
  })
})

UserSchema.methods.validatePassword = function(password,callback){
  console.log(password, this.password)
  bcrypt.compare(password, this.password, (err,same)=>{
    if(!err){
      console.log(same)
      callback(err,same)
    }else{
      next()
    }
  })
}

//User Model
const UserModel = mongoose.model("User_Data", UserSchema, "User_Data");
module.exports = UserModel