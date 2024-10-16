import React, { useContext, useEffect } from 'react';
import {NavLink, useNavigate} from 'react-router-dom'
import "./RecipesCards.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import {ThemeModeContext} from "../../../src/App" 
import axios from 'axios';
import verifyLogedInUser from '../../../middleware/verifyLogedInUser';

function RecipesCards({id,image,title,whichComponentUsedIt}){
  const navigate = useNavigate();
  const path = `/recipes/detail/:${id}` 
  const recipeId = id;

  function handleNavLinkEvent(e){
    if(whichComponentUsedIt != "profile"){
      window.scrollTo({
        top:0,
        behavior:'smooth'
      })
    }
  }
 
  async function handleWishListBtn(e) {
    const isUserLogedIn = await verifyLogedInUser();
    // for not authenticated user
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
      }catch(err){
      console.log("error occure during add recipe to wishList => ",err.response);
      if(err.response.status == 401)window.alert(err.response.data.msg)
      if(err.response.status == 404)window.alert(err.response.data.msg)
    }
  }

  // this given code already used in profile component
  // for profile component
  // create delete Btn when cards component used in profile

  // useEffect(()=>{
  //   if(whichComponentUsedIt == 'profile'){
  //     const deleteBtnTag = document.querySelectorAll('.deleteBtn')
  //     deleteBtnTag.forEach(btns=>{
  //       btns.innerText = 'x'
  //       btns.classList.add('active');
  //       btns.addEventListener('click',handleDeleteSpecificRecipeWishListBtn)
  //     })
  //   }
  // },[])

  // async function handleDeleteSpecificRecipeWishListBtn(e) {
  //   e.preventDefault();
  //   const recipeId =  e.target.id;
  //   try{
  //     // let response = await axios.delete(`https://react-recipes-server.vercel.app/wishList/deleteSpecificRecipe/:${recipeId}`);
  //     const response = await axios.delete(`http://localhost:4000/wishList/deleteOneRecipeWishList/:${recipeId}`); 
  //     if(response.status == 200){
        
  //     }
      
  //   }catch(err){
  //     console.log("error occure during delete specific recipe from wishList => ",err.response);
  //   }
  // }

 return(
    <div className="recipesCardContainer">
            <div className="recipeWishList" onClick={handleWishListBtn}>
                 <FontAwesomeIcon icon={faHeart} />
            </div>
        <NavLink to={path} onClick={handleNavLinkEvent} className={({isActive})=>
                          isActive ? 'active-recipeCard recipeNav-link':'recipeNav-link'
         }>
            <div className="recipeCardImage" style={{backgroundImage:`url(${image})`}}>
              {/* for delete specific recipe from wishList 
              it's only appeared on profile */}
              <div className='deleteBtn' id={recipeId} >
                {/* x */}
              </div>
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