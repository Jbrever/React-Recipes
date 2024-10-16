const express = require("express");
const {postRecipeWishList,getRecipeWishList,deleteAllWishList,deleteOneWishList} = require("../controller/index")
const routes = express.Router();

routes.post("/addtowishlist",postRecipeWishList);
routes.get("/wishListdata/:email",getRecipeWishList);
routes.delete("/deleteAllwishList/:email",deleteAllWishList)
routes.delete("/deleteOneRecipeWishList/:recipeId/:email",deleteOneWishList)
module.exports = routes;