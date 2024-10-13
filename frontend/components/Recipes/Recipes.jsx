import React from 'react';
import './Recipes.css'
import { useParams } from 'react-router-dom';
import {RecipesCards,RecipesDetail} from './index'
import {useSearchRecipeHook} from '../../hooks/index'

function Recipes(){
   let param = useParams();
   let paramValue = null
   if(param.value != null) paramValue = param.value.slice(1);
   const data = useSearchRecipeHook(paramValue);
   if (!data){
      return(
         <div className='dataLoading'>Loading.....</div>
      )
   }
    return(
          <div className="recipeContainer">
                <div className="recipeMainContainer">
                   <div className="heading">
                       Let's cook your Favorite 
                      <span>
                       {paramValue}
                      </span>
                      <span >Recipe With us</span>
                    </div>
                   <div className="page1">
                     {data.map((item,index)=>{
                          return <RecipesCards key={index} id={item.id} image={item.image} title={item.title}/>
                     })}
                   </div>         
                </div>
          </div>
    )
}

export default Recipes