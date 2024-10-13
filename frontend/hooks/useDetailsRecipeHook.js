import React, { useEffect, useState } from "react";
import {recipeDetailsData} from "../Dummy Data/index"
import axios from "axios";
function useDetailsRecipeHook(id){
    let [data,setData] = useState({})
    
    const URL =`https://api.spoonacular.com/recipes/${id.slice(1)}/information?apiKey=${'d7408074211b436ab11ca7c28b6c82a200'}`
    useEffect(()=>{
     async function fetchData(){
       try{
           let response = await axios.get(URL)
           setData(response.data);
       }catch(err){
           console.log("ERROR OCCURE DURING Fetch Recipe Details",err)
           setData(recipeDetailsData)
       } 
     }
     fetchData();
    },[id])

  return data
}

export default useDetailsRecipeHook