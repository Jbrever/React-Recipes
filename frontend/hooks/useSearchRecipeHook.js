import React , {useEffect , useState} from "react";
import axios from 'axios';
import {recipeData} from '../Dummy Data/index'

 function useSearchRecipeHook (searchValue){
    const [ data , setData ] = useState([])
    // const API_KEY = process.env.REACT_APP_API_KEY;
    if(searchValue == null) searchValue = "veg"
    useEffect(()=>{
      const fetchData = async () =>{
        const URL = `https://api.spoonacular.com/recipes/complexSearch?query=${searchValue}&apiKey=${"bb67b46e5c61467cb97328f34b91e743"}&number=32`
          try{
            let resoponse = await axios.get(URL)
            setData(resoponse.data.results);
          
          }catch(err){
            console.log("ERROR occcured During first fetch DATA, using Dummy Data");
            const URL = `https://api.spoonacular.com/recipes/complexSearch?query=${searchValue}&apiKey=${"d7408074211b436ab11ca7c28b6c82a2"}&number=32`
            // if the limit of the first API is over then the second API Would be Call  
            try{
              let resoponse = await axios.get(URL)
              setData(resoponse.data.results);
          
            }catch(err){
              console.log("ERROR occcured During second fetch DATA, using Dummy Data");
            // if the limit of the second API is over then the Dummy Data Would be Call  
              setData(recipeData.results);
            }
          }
      }
      fetchData();
    },[searchValue])
    return data
}

export default useSearchRecipeHook