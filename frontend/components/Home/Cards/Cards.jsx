import React from 'react';
import {NavLink} from 'react-router-dom'
import './Cards.css'
function Cards({heading , title , image}){
   
  if(heading != ''){
     var endpoint = `/recipes/search/:${heading}`
   }else{
    var endpoint = `/recipes/all`
   }

    return(
   <div className='cardContainer'>      
     <NavLink to={endpoint} style={{textDecoration:'none'}}>
        <div className="cardImage" style={{backgroundImage:`url(${image})`}} >
          
           <div className="cardInfo">
              
              <h2 className="cardHeading">
                {heading}
              </h2>
              
              <p className="cardTitle">
                {title}
              </p>

            </div>       
        
        </div>
     </NavLink>
   </div>
 )
}

export default Cards