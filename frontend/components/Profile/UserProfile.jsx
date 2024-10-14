import React, { useContext, useEffect, useState } from "react";
import "./UserProfile.css"
import {Link, useNavigate} from 'react-router-dom'
import { ThemeModeContext } from "../../src/App";
import axios from "axios";
function UserProfile(){
    const navigate = useNavigate();
    let [userData,setUserData] = useState(JSON.parse(localStorage.getItem("userData")))
    // for Dark-Light mode
    const {themeMode} = useContext(ThemeModeContext)
    useEffect(()=>{
        if(themeMode == 'dark'){
            document.querySelector(".profileContainer").classList.toggle('profileDarkMode')
        }else{
            document.querySelector('.profileContainer').classList.remove('profileDarkMode')
        }
    },[themeMode])

    useEffect(()=>{
        const verifyLogedInUser= async ()=>{
            try{
                const JWTtoken = localStorage.getItem("token");
                if(JWTtoken){
                    let response = await axios.post('http://localhost:4000/userAuth',{"token":JWTtoken})
                    document.querySelector(".userNotLogedIN").classList.remove('active');
                    document.querySelector(".userLogedIN").classList.add('active'); 
                }else{
                    throw null
                }   
            }
            catch(err){
                console.log("error occure at profile component during verify Token => ",err);
                localStorage.removeItem("token");
                document.querySelector(".userLogedIN").classList.remove('active');
                document.querySelector(".userNotLogedIN").classList.add('active');
            }
        }
        verifyLogedInUser();
    },[])
    
    return(
        <div className="profileContainer">
           <div className="userNotLogedIN">
             <p className="heading">Please Login to view your profile</p>
             <button onClick={()=>navigate("/login")} className="loginBtn">Login</button>
           </div>
           <div className="userLogedIN">
               <div className="userImage">
                 <img src="https://cdn.vectorstock.com/i/500p/20/76/man-avatar-profile-vector-21372076.jpg" alt="" />
               </div>
               <div className="userName">
                  <p>{userData ? userData.username : "user"}</p>
               </div>
           </div>
        </div>
    )
}

export default UserProfile