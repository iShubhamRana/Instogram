import React, { useEffect } from "react";
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import PostIcon from "../Images/add_circle_outline_black_24dp.svg";
import {Link} from "react-router-dom";
const SideProfile=()=>{
  
    const user=useSelector((state)=>{return state.currentUser});
    const showCreatePost=()=>{
     const CreatePostBox= document.getElementById("CreatePost");
     if(CreatePostBox.style.display=='none')
      CreatePostBox.style.display='flex';
     else
     CreatePostBox.style.display='none';
    }
    return (
        <div className="SideProfile">
        <div>
          <img src={user.profile_pic}/>
          <div className="SideProfile-info-box">
           <p><b><NavLink to={"/"+user.username} >{user.username}</NavLink></b> </p>
            <p>{user.name}</p>
          </div>  
          <Link> <button className="post-btn" onClick={showCreatePost}><img src={PostIcon} /></button> </Link>
        </div>
        </div>
        
    );
}
export default SideProfile;