const userModel = require("../model/userSchema")
const bcrypt = require("bcrypt")
const jsonwebtoken = require('jsonwebtoken');
const secret_key = "jbrever$#@1"

async function getLogin(req,res){
    try{
       const {email,password} = req.body
       const user = await userModel.findOne({email})
       console.log("user => ",user)
       if(!user){
         return res.status(404).json({"msg":"user not found"})
       }

       const passwordMatch = await bcrypt.compare(password , user.password)

       if(passwordMatch){
         const userObj = user.toObject();
         delete userObj.password

          jsonwebtoken.sign({userObj},secret_key,{expiresIn:"1h"},(err,token)=>{ 
            if(err){
              console.log("err occure during generate JWT Token => ",err);
            }
            return res.status(200).json({
              "user":userObj,
              "token":token,
              "msg":"user credentials matched succesfully",
            });
         })
       }else{
         return res.status(401).json({'msg':"password not matched"})
       }

    }catch(err){
     console.log("default error at login controller => ",err)
     res.status(500).json({"msg":"default error "})
    }
}

module.exports = getLogin;