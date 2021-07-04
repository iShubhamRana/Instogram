import axios from "axios";
import React from "react"
import {createPortal} from "react-dom";
import { Link } from "react-router-dom";
import "../css/Likers.css";
const LikersModal=(props)=>{
    
    return createPortal(
    <>
      <div className="overlay_background"  onClick={props.hide}/>
      <div className="likers">
          <div className="likers-top">
            Likes
          </div>
          <div className="likers-list">
          {  (props.likers.length==0)
             ? <h4>No Likes</h4>
             : props.likers.map((liker)=>{
              return (
                <div className="likers-card">
                   <div className="likers-image">
                       <img src={liker.profile_pic} />
                   </div>
                   <div className="likers-info">
                      <Link to={"/"+liker.username}>{liker.username} </Link>
                      <span>{liker.name}</span>

                   </div> 
               </div>
              )
          })}
            
          </div>
      </div>


    </>, document.getElementById("modal_root"));
}
export default LikersModal;