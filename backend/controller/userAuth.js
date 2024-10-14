const { getUserToken } = require("../services/userAuth");

async function userAuth(req,res) {

        const JWTtoken = req.body.token;
        const resoponse = await getUserToken(JSON.parse(JWTtoken));
        
        if(!resoponse){
            return res.status(401).json({"msg":"JWT token expired"})
        }
        res.status(200).json({"msg":"JWT token not expired"})
}

module.exports = userAuth;