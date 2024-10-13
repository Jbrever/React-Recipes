import React, { useContext, useEffect } from "react";
import "./UserProfile.css"
import {Link} from 'react-router-dom'
import { ThemeModeContext } from "../../src/App";
function UserProfile(){

    // for Dark-Light mode
    const {themeMode} = useContext(ThemeModeContext)
    useEffect(()=>{
        if(themeMode == 'dark'){
            document.querySelector(".profileContainer").classList.toggle('profileDarkMode')
        }else{
            document.querySelector('.profileContainer').classList.remove('profileDarkMode')
        }
    },[themeMode])
    
    return(
        <div className="profileContainer">
         <Link to='/signup'>signup</Link>
         <Link to= '/login'>login</Link>
        </div>
    )
}

export default UserProfile