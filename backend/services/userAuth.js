const jsonwebtoken = require('jsonwebtoken');
const secret_key = "jbrever$#@1"

async function setUserToken(userObj){
   try{
     const token = jsonwebtoken.sign({userObj},secret_key,{expiresIn:"10m"})
     return token;
   }catch(err){
     console.log("error occure during generate JWT token => ", err);
   }
}

async function getUserToken(token){
    try{
        const resoponse = jsonwebtoken.verify(token,secret_key)
        return resoponse
    }catch(err){
        console.log("error occure during verify JWT token => ",err.name);
        return undefined
    }
}

module.exports = {setUserToken , getUserToken};