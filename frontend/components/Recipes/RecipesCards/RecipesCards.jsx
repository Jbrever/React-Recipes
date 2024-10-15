import React, { useContext, useEffect } from 'react';
import {NavLink, useNavigate} from 'react-router-dom'
import "./RecipesCards.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import {ThemeModeContext} from "../../../src/App" 
import axios from 'axios';
import verifyLogedInUser from '../../../middleware/verifyLogedInUser';

function RecipesCards({id,image,title}){
  const navigate = useNavigate();
  const path = `/recipes/detail/:${id}` 
  const recipeId = id;
  function handleNavLinkEvent(e){
    window.scrollTo({
      top:0,
      behavior:'smooth'
    })
  }
 
  async function handleWishListBtn(e) {
    console.log("wishList")
    const isUserLogedIn = await verifyLogedInUser();
    console.log("yeSssssssssssss",isUserLogedIn);
    if(isUserLogedIn == null){
      window.alert("please login to save recipes to your wishList");
      navigate('/login')
      return;
    }
    e.target.style.color = "red";
    try{
      const userData = JSON.parse(localStorage.getItem('userData'));
     
      let response = await axios.post('https://react-recipes-server.vercel.app/wishList/addtowishlist',{recipeId,image,title,userData});
      // const response = await axios.post("http://localhost:4000/wishList/addtowishlist",{recipeId,image,title,userData});
     
      console.log("wishList => ",response);
    }catch(err){
      console.log("error occure during add recipe to wishList => ",err.response);
      if(err.response.status == 401)window.alert(err.response.data.msg)
      if(err.response.status == 404)window.alert(err.response.data.msg)
    }
  }
  
  
 return(
    <div className="recipesCardContainer">
            <div className="recipeWishList" onClick={handleWishListBtn}>
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