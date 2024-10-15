const express = require("express");
const {postRecipeWishList,getRecipeWishList} = require("../controller/index")
const routes = express.Router();

routes.post("/addtowishlist",postRecipeWishList);
routes.get("/wishListdata/:email",getRecipeWishList);

module.exports = routes;