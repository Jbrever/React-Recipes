const {recipeWishListModel} = require("../model/index")
let deleteOneRecipeByemail = undefined;
async function  postRecipeWishList(req,res){
  try{
      const {recipeId,image,title,userData} = req.body;
      const userEmail = userData.email;
      deleteOneRecipeByemail = userEmail;
      const isRecipeExisted = await recipeWishListModel.findOne({recipeId,userEmail});
      if(isRecipeExisted){
          return res.status(401).json({"msg":"This recipe already existed to your wishList"});
      }
      const newRecipe = new recipeWishListModel({recipeId,image,title,userEmail});
      await newRecipe.save();
      
      res.status(201).json({"msg":"This recipe Added to your wishList"});
  }catch(err){
    console.log("error occure at recipe WishList controller => ",err);
    res.status(404).json({'msg':"sorry , error , please report it"})   
  }
}


async function  getRecipeWishList(req,res){
    try{
        const userEmail = req.params.email.slice(1);
        const wishListData = await recipeWishListModel.find({userEmail});
        
        if(wishListData.length == 0){
            return res.status(401).json({"msg":"your wisList is empty"});
        }
        
        res.status(201).json({"msg":"your wishList data is fetched","wishListData":wishListData});
      }catch(err){
      console.log("error occure at recipe getWishList controller => ",err);
      res.status(404).json({'msg':"sorry , error , please report it"})   
    }
}


async function  deleteAllWishList(req,res){
    try{
      const userEmail = req.params.email.slice(1);
      const response = await recipeWishListModel.deleteMany({userEmail})
      res.status(200).json({"msg":"all wishList data successfully deleted"});
    }catch(err){
      console.log("error occure at recipe Delete All WishList controller => ",err);
      res.status(404).json({'msg':"sorry , error , please report it"})
    }
}

async function  deleteOneWishList(req,res){
  try{
    const recipeId = req.params.recipeId.slice(1);
    const response = await recipeWishListModel.deleteOne({recipeId , deleteOneRecipeByemail});
    console.log("jjj",response)
    res.status(200).json({"msg":"given wishList delete request successfully complete"});
  }catch(err){
    console.log("error occure at recipe Delete one WishList controller => ",err);
    res.status(404).json({'msg':"sorry , error , please report it"});
  }
}


module.exports = {postRecipeWishList , getRecipeWishList , deleteAllWishList , deleteOneWishList};