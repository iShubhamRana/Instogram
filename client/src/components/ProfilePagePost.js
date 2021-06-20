import React from "react";
import "../css/profilepage.css";
import LikeIcon from "../Images/favorite_white_24dp.svg"
import CommentIcon from "../Images/chat_bubble_white_24dp.svg"
const ProfilePagePost=(props)=>{
    return (
        <>
        <div className="ProfilePagePost">
            <div className="hover-info">
               <span><img src={LikeIcon} /> {props.post.likes.total}</span>
               <span><img src={CommentIcon} />{props.post.comments.total}</span>
            </div> 
            <img src={props.post.image}  />
        </div>
        </>
    );
}
export default ProfilePagePost;