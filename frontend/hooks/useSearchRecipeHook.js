import React , {useEffect , useState} from "react";
import axios from 'axios';
import {recipeData} from '../Dummy Data/index'

 function useSearchRecipeHook (searchValue){
    const [ data , setData ] = useState([])
    // const API_KEY = process.env.REACT_APP_API_KEY;
    console.log("sa",searchValue);
    if(searchValue == null) searchValue = "veg"
    useEffect(()=>{
      const fetchData = async () =>{
        const URL = `https://api.spoonacular.com/recipes/complexSearch?query=${searchValue}&apiKey=${"d7408074211b436ab11ca7c28b6c82a200"}&number=32`
          try{
            let resoponse = await axios.get(URL)
            setData(resoponse.data.results);
          
          }catch(err){
            console.log("ERROR occcured During fetch DATA, using Dummy Data");
            setData(recipeData.results);
          }
      }
      fetchData();
    },[searchValue])
    return data
}

export default useSearchRecipeHook