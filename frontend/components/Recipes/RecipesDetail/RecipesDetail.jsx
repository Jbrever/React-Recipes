import React from "react";
import './RecipesDetail.css'
import { useParams } from "react-router-dom";
import {useDetailsRecipeHook,useSearchRecipeHook} from "../../../hooks/index"
import {RecipesCards} from '../index'
function RecipesDetail(){
    let param = useParams()
    let {vegetarian,image,title,summary,instructions,dishTypes} = useDetailsRecipeHook(param.id);
    let similarRecipeName = null;
    
    if(dishTypes!=undefined){
        similarRecipeName = dishTypes[0]
    }
    
    let similarRecipeData = useSearchRecipeHook(similarRecipeName);
    
    return(
        <div className="recipeDetailContainer">
            <div className="recipeDetailheading">
                <div><span style={{color:"rgb(38, 237, 87)"}}>ohhhh!</span> great Your taste</div> 
                <span >is good </span>
                <span >let's cook it</span>
            </div>
            <div className="recipeImageContainer">
               <div className="recipeDetailImageMain">
                 <div className="recipeImage" style={{backgroundImage:`url(${image})`}}></div>
               </div>
            </div>
            <div className="recipeDetailTitle">
             {title}
            </div>
            <div className="recipeInfo">
                <div className="recipeSummaryContainer">
                    <span>About Recipe</span>
                   <div className="recipeSummary" dangerouslySetInnerHTML={{__html:summary}}></div>
                </div>

                <div className="recipeInstructonsContainer">
                    <span>Instrutions</span>
                    <div className="recipeInstruction" dangerouslySetInnerHTML={{__html:instructions}}></div>
                </div>
            </div>
            <div className="similarRecipeHeading">
                    similar recipes
            </div>
            <div className="similarRecipesContainer">
                {similarRecipeData.map((item,index)=>{
                          return <RecipesCards key={index} id={item.id} image={item.image} title={item.title}/>
                })}
            </div>
        </div>
    )
}

export default RecipesDetail