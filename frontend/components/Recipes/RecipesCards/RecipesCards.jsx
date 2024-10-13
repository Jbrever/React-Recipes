import React, { useContext, useEffect } from 'react';
import {NavLink} from 'react-router-dom'
import "./RecipesCards.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import {ThemeModeContext} from "../../../src/App" 

function RecipesCards({id,image,title}){
 
  const path = `/recipes/detail/:${id}` 
  
  function handleNavLinkEvent(e){
    window.scrollTo({
      top:0,
      behavior:'smooth'
    })
  }
  
 return(
    <div className="recipesCardContainer">
            <div className="recipeWishList">
                 <FontAwesomeIcon icon={faHeart} />
            </div>
        <NavLink to={path} onClick={handleNavLinkEvent} className={({isActive})=>
                          isActive ? 'active-recipeCard recipeNav-link':'recipeNav-link'
         }>
            <div className="recipeCardImage" style={{backgroundImage:`url(${image})`}}>
            </div>
            <div className="recpeCardInfo">
              <div className="recipeCardTitle">
                {title}
              </div>
            </div>
            <div className="recipeExplore">
                <button className='exploreBtn'>
                    explore it
                </button>
            </div>
        </NavLink>
    </div>
   )
}

export default RecipesCards;