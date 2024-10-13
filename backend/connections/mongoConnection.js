const mongoose = require('mongoose')

async function mongoDbConnection(URL){
    try{
        await mongoose.connect(URL);
        console.log('mongoDB ATLAS connected successfuly');
    }catch(err){
       console.log("error occure during mongoDB build Connection => ",err);
    }
}

module.exports = mongoDbConnection