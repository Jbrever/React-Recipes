const userModel = require("../model/userSchema")
const bcrypt = require("bcrypt")

async function getLogin(req,res){
    try{
       const {email,password} = req.body
       const user = await userModel.findOne({email})

       if(!user){
         return res.status(404).json({"msg":"user not found"})
       }

       const passwordMatch = await bcrypt.compare(password , user.password)

       if(passwordMatch){
         return res.status(200).json({"msg":"user credentials matched succesfully"});
       }else{
         return res.status(401).json({'msg':"password not matched"})
       }
       
       


    }catch(err){
     console.log("default error at login controller => ",err)
     res.status(500).json({"msg":"default error "})
    }
}

module.exports = getLogin;