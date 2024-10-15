const mongoose = require("mongoose");

const recipeWishListSchema = new mongoose.Schema({
    recipeId:{
        type:String,
        required:true,
        unique:true,
    },
    image:{
        type:String,
        required:true, 
    },
    title:{
        type:String,
        required:true,
    },
    userEmail:{
        type:String,
        required:true,
    },
    addedTime:{
        type:Date,
        default:Date.now
    },
})

const recipeWishListModel = mongoose.model("recipeWishList",recipeWishListSchema);

module.exports = recipeWishListModel;