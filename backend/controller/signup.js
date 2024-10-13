const userModel = require("../model/userSchema")
const bcrypt = require("bcrypt")

async function postSignup(req,res){
  try{
    const {username , email , password}= req.body;
    const isDataExist = await userModel.findOne({email});
    if(isDataExist){
        return res.status(400).json({"msg":"user already existed"})
    }
    
    const hasedPassword = await bcrypt.hash(password,10);
    const newUser = new userModel({username , email , password:hasedPassword})
    const savedUser = await newUser.save();
     
    return res.status(201).json({"msg":"new user created"})
  
  }catch(err){
    console.log("error occure at signup controller => ",err);
    res.status(404).json({'msg':"default error"})   
  } 

};

module.exports = postSignup
