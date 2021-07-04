import React from "react";
import {createPortal} from "react-dom";
import "../css/profilepage.css";

const Modal=(props)=>{
  return createPortal(
     <>
        <div className="overlay_style" onClick={props.hide}/>
        <div className="unfollow-modal">
            <div> 
                <img src={props.profile_pic} />
                <p>Unfollow {props.username} ?</p>
            </div>
            <div className="unfollow-btn" onClick={props.unFollow}>
                <p>Unfollow</p>
            </div>
            <div className="unfollow-btn" onClick={props.hide}>
                <p>Cancel</p>
            </div>
        </div>
     </>,
     document.getElementById("modal_root")
   )
}
export default Modal;