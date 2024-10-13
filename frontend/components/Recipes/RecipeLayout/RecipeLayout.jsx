import React, { useContext, useEffect } from "react";
import './RecipeLayout.css'
import { Outlet } from "react-router-dom";
import {Sidebar} from '../../index'
import {RecipesCards,RecipesDetail} from '../index'
import { ThemeModeContext } from "../../../src/App";

function RecipeLayout(){
   
   let {themeMode} = useContext(ThemeModeContext);
   useEffect(()=>{

      if(themeMode == 'dark'){
         document.querySelector(".recipeLayoutContainer").classList.toggle('darkRecipeLayoutContainer');
      }
      else{
         document.querySelector(".recipeLayoutContainer").classList.remove('darkRecipeLayoutContainer');
      }

   },[themeMode])

   return(
      <div className="recipeLayoutContainer">
      <aside>
         <div className="recipeLayoutSidebar">
            <Sidebar/>
         </div>
      </aside>
      <section>
         <div className="recipeLayoutMainContainer"> 
               <Outlet/>
         </div>
      </section>
   </div>
   )
}
export default RecipeLayout