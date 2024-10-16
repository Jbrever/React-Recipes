import React, { useContext, useEffect, useState } from "react";
import "./UserProfile.css"
import {Link, useNavigate} from 'react-router-dom'
import { ThemeModeContext } from "../../src/App";
import axios from "axios";
import verifyLogedInUser from "../../middleware/verifyLogedInUser"
import { RecipesCards } from "../Recipes/index";

function UserProfile(){
    const navigate = useNavigate();
    let [wishListData , setWishListData] = useState([]);
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

    // for user auth
    useEffect(()=>{
       async function verifyUserAuth() {
        try{
            let response = await verifyLogedInUser();
            if(response == null) throw null

            document.querySelector(".userNotLogedIN").classList.remove('active');
            document.querySelector(".userLogedIN").classList.add('active'); 
        }
        catch(err){
            console.log("error occure at profile component during verify Token => ",err);
            document.querySelector(".userLogedIN").classList.remove('active');
            document.querySelector(".userNotLogedIN").classList.add('active');
        }
       }
       verifyUserAuth();      
    },[])
    
    // user logout
    function handleLogoutBtn(){
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        navigate('/');
    }

    
    // for get wishList Data 
    useEffect(()=>{
        async function fetchWishListData(){
            try{                
                const response = await axios.get(`https://react-recipes-server.vercel.app/wishList/wishListdata/:${userData.email}`); 
                // const response = await axios.get(`http://localhost:4000/wishList/wishListdata/:${userData.email}`);
                
                document.querySelector(".wishListH2Heading").innerText = "your wishList"
                setWishListData(response.data.wishListData);

                // create deleteAll Btn for delete enitre wishList Data after fetch Data
                let wishListContainerTag = document.querySelector(".wishListContainer");
                let deleteAllWishListTag = document.createElement('div');
                deleteAllWishListTag.classList.add("deleteAllWishList");
                wishListContainerTag.appendChild(deleteAllWishListTag);
                let deleteAllBtnTag = document.createElement('button');
                deleteAllBtnTag.classList.add('deleteAllBtn');
                deleteAllBtnTag.innerText = "Delete All"
                deleteAllBtnTag.addEventListener("click",handleDeleteAllWishListBtn)
                deleteAllWishListTag.appendChild(deleteAllBtnTag);
                
            }catch(err){
                console.log("error occure during fetch wishList Data => ",err.response);
                if(err.response.status == 401){
                    document.querySelector(".wishListH2Heading").innerText = "your wishList is empty"
                }
                if(err.response.status == 404)window.alert(err.response.data.msg)
            }
        }
        fetchWishListData();
    },[])

    async function handleDeleteAllWishListBtn(){
         try{
           const response = await axios.delete(`https://react-recipes-server.vercel.app/wishList/deleteAllwishList/:${userData.email}`); 
        //    const response = await axios.delete(`http://localhost:4000/wishList/deleteAllwishList/:${userData.email}`);
           
           // reload page when All wishList data deleted
           if(response.status == 200){
            // window.location.reload();
            // navigate(0);
            document.querySelector(".deleteAllWishList").remove();
            document.querySelector(".wishListH2Heading").innerText = "your wishList is empty"
            setWishListData([])
           }
         }catch(err){
            console.log("error occure during delte all wishList Data => ",err.response);
         }
    }

    

//    this below code is taken from recipeCard component because in recipe Card i can't refresh wishList data 
//    without reload entire page , so i needed the state that can be refresh wishList's data 
//    by just changing it's state without reload entire page so those State named is "wishListData" that i managed in this profile component

    useEffect(()=>{
        // deleteBtnTag taken by recipeCard component, it's not declared in profile component
        const deleteBtnTag = document.querySelectorAll('.deleteBtn')

        // it's work only for the card component
        deleteBtnTag.forEach(btns=>{
            btns.innerText = 'x'
            btns.classList.add('active');
            btns.addEventListener('click',handleDeleteSpecificRecipeWishListBtn)
          })
    })

    async function handleDeleteSpecificRecipeWishListBtn(e) {
        e.preventDefault();
        const recipeId =  e.target.id;
        try{
          let response = await axios.delete(`https://react-recipes-server.vercel.app/wishList/deleteOneRecipeWishList/:${recipeId}/:${userData.email}`);
          // const response = await axios.delete(`http://localhost:4000/wishList/deleteOneRecipeWishList/:${recipeId}/:${userData.email}`);
          if(response.status == 200){
            //for refresh wishList data
            const response = await axios.get(`https://react-recipes-server.vercel.app/wishList/wishListdata/:${userData.email}`); 
            setWishListData(response.data.wishListData);
          }
          
          
        }catch(err){
          console.log("error occure during delete specific recipe from wishList => ",err.response);
          // if recipe wishList empty 
          if(err.response.status == 401){
            document.querySelector(".deleteAllWishList").remove();
            document.querySelector(".wishListH2Heading").innerText = "your wishList is empty"
            setWishListData([]);
          }
        }
    }


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
               <div className="logout">
                 <button className="logoutBtn" onClick={handleLogoutBtn}>Logout</button>
               </div>
               <div className="wishListContainer">
                  <div className="wishListHeading">
                    <h2 className="wishListH2Heading"></h2> 
                  </div>
                  <div className="wishListMain">
                    {
                        wishListData.map((ele,index)=>{
                           return <RecipesCards key={index} id={ele.recipeId} image={ele.image} title={ele.title} whichComponentUsedIt={"profile"}/>
                        })
                    }
                  </div>
                  {/* <div className="deleteAllWishList">
                    <button className="deleteAllBtn" onClick={handleDeleteAllWishListBtn}>Delete All</button>
                  </div> */}
               </div>
           </div>
        </div>
    )
}

export default UserProfile