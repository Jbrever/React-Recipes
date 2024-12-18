import React, { useEffect, useState } from "react";
import {recipeDetailsData} from "../Dummy Data/index"
import axios from "axios";
function useDetailsRecipeHook(id){
    let [data,setData] = useState({})
    
    const URL =`https://api.spoonacular.com/recipes/${id.slice(1)}/information?apiKey=${'bb67b46e5c61467cb97328f34b91e743'}`
    useEffect(()=>{
     async function fetchData(){
       try{
           let response = await axios.get(URL)
           setData(response.data);
       }catch(err){
          console.log("ERROR OCCURE DURING first Fetch Recipe Details",err)
          // if the limit of the first API is over then the second API Would be Call  
          try{
            const URL =`https://api.spoonacular.com/recipes/${id.slice(1)}/information?apiKey=${'d7408074211b436ab11ca7c28b6c82a2'}`
            let response = await axios.get(URL)
            setData(response.data);
          }catch(err){
            console.log("ERROR OCCURE DURING second Fetch Recipe Details",err)
            // if the limit of the second API is over then the Dummy Data Would be Call  
           setData(recipeDetailsData)
          }
       }
     }
     fetchData();
    },[id])

  return data
}

export default useDetailsRecipeHook