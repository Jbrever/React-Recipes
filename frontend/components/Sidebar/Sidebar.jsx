import React, { createElement, useContext, useEffect, useRef } from "react";
import './Sidebar.css'
import {useNavigate} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faHeart, faXmark } from '@fortawesome/free-solid-svg-icons'
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { ThemeModeContext } from "../../src/App";

function Sidebar(){
    const navigate = useNavigate();
    const cuisinesPart1 = useRef(null);
    const cuisinesPart2 = useRef(null);
    const fastFoodsPart1 = useRef(null);
    const fastFoodsPart2 = useRef(null);
    const popularFoodsPart1 = useRef(null);
    const popularFoodsPart2 = useRef(null);

    const cuisinesArr = [
        "European",,"Indian","French","German","Greek","Irish","Italian","Japanese","Jewish","Korean","Latin American","Mediterranean","Mexican","Middle Eastern","Nordic","Southern","Spanish","Thai","Vietnamese","African","Asian","American","British","Cajun","Caribbean","Chinese","Eastern European",
    ];
    const fastFoodsArr = [
      "Burger", "Pizza", "Hot Dog", "Fries", "Fried Chicken", "Tacos", "Sandwich", "Nuggets", "Donuts", "Burrito", "Quesadilla", "Nachos", "Onion Rings", "Chicken Wings", "Submarine Sandwich", "Corn Dog", "Fish and Chips", "Soft Pretzel", "Mozzarella Sticks", "Cheeseburger",
    ];

    const popularFoodsArr = [
      "Biryani","Samosa","Idli","Sambar","Butter Chicken","Tandoori Chicken","Paneer Tikka","Masala Dosa","Chole Bhature","Rogan Josh","Palak Paneer","Dal Makhani","Aloo Paratha","Pani Puri","Vada Pav","Dhokla","Pav Bhaji","Rajma Chawal","Kebabs","Gulab Jamun"
    ];    
    const cuisinesArrLen = cuisinesArr.length
    const fastFoodsArrLen = fastFoodsArr.length;
    const popularFoodsArrLen = popularFoodsArr.length;
    
    function createTags(parentTag , data){
      const selectItemBox = document.createElement("div")
      selectItemBox.classList.add("selectItemBox");
      const labelTag = document.createElement("label");
      const inputTag = document.createElement("input");
      labelTag.setAttribute('for', data);
      labelTag.innerText = data;
      inputTag.setAttribute("type","checkBox");
      inputTag.setAttribute("id",data);
      inputTag.setAttribute("value",data);
      inputTag.classList.add("checkedItem")
      selectItemBox.appendChild(inputTag);
      selectItemBox.appendChild(labelTag);
      parentTag.current.appendChild(selectItemBox);

      inputTag.addEventListener('change',function(e){
        if(e.target.checked){
          const path = `/recipes/search/:${e.target.value}`;
          navigate(path)

          // for mobile use
          let sidebarMainContainer = document.querySelector(".sidebarMainContainer");
         sidebarMainContainer.classList.toggle("activeSidebar");
        } 
        setTimeout(()=>{
          e.target.checked = false
        },1000)
      })

      selectItemBox.addEventListener("click",function(e){
        window.scrollTo({
          top:0,
          behavior:'smooth'
        })
      })
    }


    useEffect(()=>{
       for(let i = 0; i<4; i++){
           if(cuisinesArr[i])createTags(cuisinesPart1,cuisinesArr[i])
           if(fastFoodsArr[i])createTags(fastFoodsPart1,fastFoodsArr[i])
           if(popularFoodsArr[i])createTags(popularFoodsPart1,popularFoodsArr[i])
       } 
    },[])
    
    function handleSidebarSearchEvent(e){
      if(e.key == "Enter"){
        const path = `/recipes/search/:${e.target.value}`; 
        navigate(path);
        e.target.value = ''

        // for mobile use
        let sidebarMainContainer = document.querySelector(".sidebarMainContainer");
        sidebarMainContainer.classList.toggle("activeSidebar");
      }
    }
    
    function handleSeeAllBtn(e,parentTag,data){
      parentTag.current.innerHTML = '';
      for(let i = 5;i<9; i++){
       if(data[i])createTags(parentTag,data[i])
      }
      parentTag.current.classList.toggle('seeMore')
      
      if(parentTag.current.classList.contains('seeMore')){
        e.target.innerText = "see less"
      }
      else{
        e.target.innerText = "see more"
      } 
      
      
    }
    
    // for mobile use
    function handleSidebarShowBtn(e){
      let sidebarMainContainer = document.querySelector(".sidebarMainContainer");
      sidebarMainContainer.classList.toggle("activeSidebar");
      let hideBtnContainer = document.querySelector(".hideBtnContainer");
      hideBtnContainer.classList.toggle("hideBtnVisible");
      console.log(hideBtnContainer);
    }
    
    // for mobile use
    function handleSidebarHideBtn(e){
      let sidebarMainContainer = document.querySelector(".sidebarMainContainer");
      sidebarMainContainer.classList.toggle("activeSidebar");
      let hideBtnContainer = document.querySelector(".hideBtnContainer");
      hideBtnContainer.classList.toggle("hideBtnVisible");
    }
     

    // for Dark light theme Mode

    let { themeMode }= useContext(ThemeModeContext)
     
     useEffect(()=>{

        if(themeMode === 'dark'){   
            document.querySelector('.sidebarContainer').classList.toggle("darkModeSidebarContainer");
        }else{
          document.querySelector('.sidebarContainer').classList.remove("darkModeSidebarContainer");
        }
     
      },[themeMode])

    
  return(
    <>
     <div className="sidebarContainer">
        {/* for mobile use given code*/}
       <div className="hide_ShowSideBarContainer">
         <div className="hideBtnContainer"  onClick={handleSidebarHideBtn}>
           <FontAwesomeIcon icon={faXmark}/>
         </div>
         <div className="showBtnContainer" onClick={handleSidebarShowBtn}>
           <FontAwesomeIcon icon={faBars}/>
         </div>
       </div>
        {/* for mobile use above code*/}

       <div className="sidebarMainContainer"> 
          <div className="searchBox">
            <h1 >menu</h1>
            <input type="text" onKeyUp={handleSidebarSearchEvent} placeholder="Search" />
          </div>
          <div className="foodCategory">
           <div className="cuisines">
             <h1>Cuisines</h1>       
             <div className="cuisinesPart1" ref={cuisinesPart1}>
              {/* <div className="selectItemBox">
                <input type="checkBox" id="region" />
                <label htmlFor="region">
                  india
                </label>
              </div>
              <div className="selectItemBox">
                <label htmlFor="america">
                   <input type="checkBox" id="america" />
                    America
                </label>
              </div> */}
             </div>
         
            <div className="cuisinesPart2" ref={cuisinesPart2}>
              {/* <div className="selectItemBox">
                <input type="checkBox" id="region" />
                <label htmlFor="region">
                  india
                </label>
              </div>
              <div className="selectItemBox">
                <label htmlFor="america">
                   <input type="checkBox" id="america" />
                    America
                </label>
              </div> */}
            </div>

            <div className="seeAllBtn">
              <button onClick={(e)=>handleSeeAllBtn(e,cuisinesPart2,cuisinesArr)}>see more</button>
            </div>
         
           </div>
         
          <div className="fastFoods">
            <h1>Fast Foods</h1>
            <div className="fastFoodsPart1" ref={fastFoodsPart1}>
              {/* <div className="selectItemBox">
                <label htmlFor="region">
                  <input type="checkBox" id="region" />
                  india
                </label>
              </div>
              <div className="selectItemBox">
                <label htmlFor="america">
                   <input type="checkBox" id="america" />
                    America
                </label>
              </div> */}
            </div>
            <div className="fastFoodsPart2" ref={fastFoodsPart2}>
           
            {/*<div className="selectItemBox">
                <input type="checkBox" id="region" />
                <label htmlFor="region">
                  india
              </label>
              </div>
              <div className="selectItemBox">
                <label htmlFor="america">
                   <input type="checkBox" id="america" />
                    America
                </label>
              </div> */}

            </div>
            <div className="seeAllBtn">
               <button value="fastFoodsPart2" onClick={(e)=>handleSeeAllBtn(e,fastFoodsPart2,fastFoodsArr)}>see more</button>
            </div>   
          </div> 
          
          <div className="popularFoods">
            <h1>popular recipes</h1>
            <div className="popularFoodsPart1" ref={popularFoodsPart1}>
              {/* <div className="selectItemBox">
                <label htmlFor="region">
                  <input type="checkBox" id="region" />
                  india
                </label>
              </div>
              <div className="selectItemBox">
                <label htmlFor="america">
                   <input type="checkBox" id="america" />
                    America
                </label>
              </div> */}
            </div>
            <div className="popularFoodsPart2" ref={popularFoodsPart2}>

            </div>
            <div className="seeAllBtn">
               <button  onClick={(e)=>handleSeeAllBtn(e,popularFoodsPart2,popularFoodsArr)}>see more</button>
            </div>   
          </div>
          </div>
        </div> 
       </div>
    </>   
  )
}

export default Sidebar