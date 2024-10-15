const express = require("express");
const {postRecipeWishList,getRecipeWishList,deleteAllWishList} = require("../controller/index")
const routes = express.Router();

routes.post("/addtowishlist",postRecipeWishList);
routes.get("/wishListdata/:email",getRecipeWishList);
routes.delete("/deleteAllwishList/:email",deleteAllWishList)

module.exports = routes;