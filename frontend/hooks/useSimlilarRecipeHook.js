import React, { useEffect, useState } from "react";
import {recipeDetailsData} from "../Dummy Data/index"
import axios from "axios";
function useSimilarRecipeHook(id){
    let [data,setData] = useState({})
    
    const URL =`https://api.spoonacular.com/recipes/${id.slice(1)}/similar?apiKey=bb67b46e5c61467cb97328f34b91e74300`
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

export default useSimilarRecipeHook