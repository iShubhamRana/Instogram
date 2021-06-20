import React, { useState } from "react";
import {createPortal} from "react-dom";
import "../css/modal.css";
import ProfilePagePost from "./ProfilePagePost";
import {useHistory} from "react-router-dom";
import "../css/Cropper-CreatePost.css";
const Modal=(props)=>{
    console.log(props.children);
    document.body.style.overflow="hidden";
    const history=useHistory();
    return createPortal(
    

        
            <div className="modal-wrapper" onClick={(e)=>{
                e.stopPropagation();
                if(e.target===e.currentTarget)    //box will only shut on outside click
                {
                  document.body.style.overflow="auto"; 
                  history.push();
                }
            }} >
              {props.children}
            </div>,
            document.getElementById("modal_root"),
        
    );
}
export default Modal;