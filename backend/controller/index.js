const postLogin = require("./login");
const postSignup = require("./signup")
const userAuth = require("./userAuth")
const {postRecipeWishList,getRecipeWishList ,deleteAllWishList} = require("./recipeWishList");

module.exports ={postLogin , postSignup ,userAuth , postRecipeWishList,getRecipeWishList,deleteAllWishList}

