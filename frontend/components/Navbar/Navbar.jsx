import React, { useEffect, useRef, useState ,useContext} from "react";
import {NavLink, useNavigate} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon , faCloudSun, faCoffee, faMagnifyingGlass, faPerson, faPersonDress, faPersonRifle, faSearch, faSun, faUser } from '@fortawesome/free-solid-svg-icons'
import "./Navbar.css"
import { ThemeModeContext } from "../../src/App";

function Navbar(){
    const navigate = useNavigate();
    const showSearchBox = useRef(null);
    const { themeMode , setThemeMode } = useContext(ThemeModeContext);
    const [darkLightModeIcon , setDarkLightModeIcon] = useState(faMoon)        
            function handleSearchBtnToggle(){
                showSearchBox.current.classList.toggle("showSearchBox")
            }

            function handleKeyUpEvent(e){
                if(e.key == 'Enter'){
                  setTimeout(()=>{
                    showSearchBox.current.classList.toggle("showSearchBox")
                  },1000)
                  const value = e.target.value
                  const path = `/recipes/search/:${value}`
                  e.target.value = ''
                  navigate(path);
                }
            }
            
          
            // for dark-light-Mode
            function handleDarkNightModeEvent(){
                let darkNightMode = document.querySelector(".dark-night-mode");
                
                // for change icon color 
                if(themeMode != "dark"){
                  darkNightMode.style.backgroundColor = "white"
                  darkNightMode.style.color = "black"
                  setDarkLightModeIcon(faCloudSun)
                }
                else{
                  darkNightMode.style.backgroundColor = "black"
                  darkNightMode.style.color = "white"
                  setDarkLightModeIcon(faMoon)
                }

                let bool = darkNightMode.classList.contains("darkMode");
                darkNightMode.classList.toggle("darkMode");

                if(bool) setThemeMode('light');
                else setThemeMode('dark');
              
                document.querySelector('.right-navbar').classList.toggle("right-navbar-darkMode")
             
                let liTag = document.querySelectorAll("li")
                for(let i = 0; i<liTag.length; i++){
                liTag[i].classList.toggle("navbarDarkModeFontColor")
              }
            }
            
            useEffect(()=>{
              localStorage.setItem("themeMode",themeMode)
            },[themeMode])  

    return(
      <nav>
        <div className="navbar">
            <div className="web-logo">
                <h1>Jbr Recipes</h1>
            </div>
          <div className="right-navbar-container">
            <div className="right-navbar">
                <ul>
                   
                   <NavLink to='/' className={({isActive})=>
                          isActive ? 'active-nav home':'nav-link'
                        } style={{textDecoration:'none'}}> 
                        
                        <li>Home </li>
                    
                    </NavLink>
                   
                   <NavLink to='/books' className={({isActive})=>
                          isActive ? 'active-nav':'nav-link'
                        } style={{textDecoration:'none'}}> 
                        
                       <li>Books</li>        
                   </NavLink>

                   <NavLink to='/recipes/all' className={({isActive})=>
                          isActive ? 'active-nav':'nav-link'
                        } style={{textDecoration:'none'}}> 
                    
                         <li>Recipes</li>
                    
                    </NavLink>

                    <NavLink to='/start' className={({isActive})=>
                          isActive ? 'active-nav':'nav-link'
                        } style={{textDecoration:'none'}}> 
                    
                         <li>Contact</li>
                    
                    </NavLink>
                </ul>
                <div className="searchBar">
                    <div className="inpBar" ref={showSearchBox}>
                       <input type="text" onKeyUp={handleKeyUpEvent} placeholder="Search..." />
                    </div>
                    <div className="icon" onClick={handleSearchBtnToggle}>
                            <FontAwesomeIcon icon={faMagnifyingGlass}/>
                    </div>
                </div>
                <div className="dark-night-mode" onClick={handleDarkNightModeEvent}>
                   <FontAwesomeIcon icon={darkLightModeIcon}/>
                </div>
            </div>
           
            <div className="profileBtn">
              <NavLink to='/profile'>
                <div className="profileIcon">
                   <FontAwesomeIcon icon={faUser}/>
                </div>
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    )
}

export default Navbar