import React, { useEffect,useContext, useState } from "react";
import axios from "axios";
import {Link, NavLink, useNavigate} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft , faCaretRight, faLock, faUser , faEnvelope} from '@fortawesome/free-solid-svg-icons'
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import "./SignupForm.css"
import { ThemeModeContext } from "../../../src/App";

function SignupForm(){
    const navigate = useNavigate();
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [rePassword,setRePassword] = useState('');


    useEffect(()=>{
        const imgContainer = document.querySelector('.images')
        const leftBtn = document.querySelector('.leftBtn')
        const rightBtn = document.querySelector('.rightBtn')
        
        let i=0;
        let images = ['https://images.unsplash.com/photo-1512149177596-f817c7ef5d4c?q=80&w=700&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' , 
            'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' , 
            'https://images.unsplash.com/photo-1505576733088-f8a0f2f4b8a7?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1610440042657-612c34d95e9f?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://plus.unsplash.com/premium_photo-1723478444451-073d876949b2?q=80&w=1444&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://plus.unsplash.com/premium_photo-1675451537771-0dd5b06b3985?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        ]
        
        setInterval(()=>{
            if(i < images.length-1){
                i++;
                imgChanger(i)
            }
            else{
                i=-1
            }
        },3000)
        
        const imgChanger = (i) =>{
            return imgContainer.style.backgroundImage= `url(${images[i]})` 
        }
        
        leftBtn.addEventListener('click',(e)=>{
            if(i>0) {  
                i--;
                imgChanger(i)
            }
        })
        
        rightBtn.addEventListener('click',(e)=>{
            if(i < images.length-1){
                i++;
                imgChanger(i)
            }
        })
    },[])

    // for dark/light Mode
    let {themeMode} = useContext(ThemeModeContext);
    useEffect(()=>{
        if(themeMode == 'dark'){
            document.querySelector('.signupMainContainer').classList.toggle('darkMode')
        }else{
            document.querySelector('.signupMainContainer').classList.remove('darkMode')
        }
    },[themeMode])
    
    // for form submition with server
    async function handleSignupFormSubmit(e){
        e.preventDefault();
        try{
            let response = await axios.post('https://react-recipes-server.vercel.app/signup',{ username, email, password})
            // let response = await axios.post('http://localhost:4000/signup',{ username, email, password})
            
            console.log('here',response);
            if(response.status == 201){
                navigate('/login')
            }
        }
        catch(err){
            console.log(err.response)
            console.log("error at signup form submition -::",err);
            // if user already existed so server would be return 400 status

            if(err.response.status == 400){
                window.alert("user already existed");
                console.log("Email already exists. Please use a different Email");
                navigate('/login');
            }
        }
    }

    return(
     <div className="signupMainContainer">
            <div className="signupHeading">
                 Signup To save 
                 <p>Your favourite Recipe</p>  
            </div>
        <div className="signupContainer">  
          <div className="images"> 
            <div className="leftBtn slideBtn">
               <FontAwesomeIcon icon={faCaretLeft}/>
            </div>
            <div className="rightBtn slideBtn">
               <FontAwesomeIcon icon={faCaretRight}/>
            </div>
          </div>  
          <div className="signupPage">
            <div className="user-img"></div>
            <h1 className="welcomeHeading">welcome</h1>
       
           <form onSubmit={handleSignupFormSubmit} method="post" action=""> 
              <label htmlFor="username">
                 <FontAwesomeIcon icon={faUser}/>
                 <input required type="text" name="username" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Enter user-name" id="username"/>
              </label>
              <label htmlFor="email1">
                 <FontAwesomeIcon icon={faEnvelope}/>
                 <input required type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}  placeholder="Enter Email"id="email1"/>
              </label>
              <label htmlFor="password">
                 <FontAwesomeIcon icon={faLock}/>
                 <input required type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)}  placeholder="Enter Password" id="password"/>
              </label>
              <label htmlFor="re-password">
                 <FontAwesomeIcon icon={faLock}/>
                 <input required type="text" name="repassword" value={rePassword} onChange={(e)=>setRePassword(e.target.value)}   placeholder="Renter password"id="re-password"/>
              </label>
           
              <div className="links">
                <Link to="/login" className="loginLink">Login</Link>
                {/* <Link href="#" className="forgetPas" target="_main">forget password ?</Link>      */}
              </div>
              <button className="signupBtn" type="submit">Signup</button>
           </form>
       
         </div>
       </div>
    </div>
    )
}

export default SignupForm