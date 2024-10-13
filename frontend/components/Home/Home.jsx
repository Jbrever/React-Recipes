import React, { useContext, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Home.css'
import Cards from './Cards/Cards';
import { ThemeModeContext } from '../../src/App';
function Home(){

     let { themeMode }= useContext(ThemeModeContext)
     
     useEffect(()=>{

        if(themeMode === 'dark'){   
            document.querySelector('.homeContainer').classList.toggle("darkHomeContainer");
        }else{
          document.querySelector('.homeContainer').classList.remove("darkHomeContainer");
        }
     
      },[themeMode])
    
    return(
        <div className="homeContainer">
            <div className="mainImg">
            </div>
            <div className="cardsContainer">
               <Cards heading='lunch' title="Let's Create Delicious Lunch" image='https://images.unsplash.com/photo-1609710219183-8d99d74a8f6e?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'/>
               <Cards heading='breakfast' title="Let's Create Delicious Breakfast" image='https://images.unsplash.com/photo-1609710219374-f9ab04af099b?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'/>
               <Cards heading='dinner' title="Let's Create Delicious Dinner" image='https://images.unsplash.com/photo-1609710219611-33446ea1f2ba?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'/>
               <Cards heading='' title="Explore More" image='https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'/>
            </div>
            <div className="jbrRecipeInfo">
                <h3>About JbrRecipe</h3>
                <div className="title">
                 <h1>Deliciously Easy:</h1> 
                 <h2>Your Ultimate Recipe Hub</h2>
                </div>
                <div className='paragraph'>
                   <p>
                     Welcome to Deliciously Easy, your ultimate 
                    destination for discovering mouth-watering 
                    recipes that are quick, simple, and full of 
                    flavor. Whether you're looking for a wholesome 
                    dinner, a quick snack, or a show-stopping dessert,
                     we have a collection of recipes that cater to 
                     every taste and occasion. Our easy-to-follow 
                     instructions and curated tips will guide you 
                     through every step, making cooking enjoyable and 
                     accessible, no matter your skill level. Get 
                     ready to explore new flavors and elevate your 
                     home-cooking experience with our diverse and 
                     delicious recipes!
                    </p>
                </div>
                <div className="learnMoreBtn">
                    <NavLink to='/about'>
                      <button className='learnMore'>
                        learn more
                      </button>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default Home