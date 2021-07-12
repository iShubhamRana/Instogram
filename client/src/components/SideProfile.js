import React, { useEffect } from "react";
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import PostIcon from "../Images/add_circle_outline_black_24dp.svg";
import {Link} from "react-router-dom";
import SuggestedPeople from "./SuggestedPeople";
import BillGates from "../Images/bill.jpeg";
import Elon from "../Images/elon.jpeg";
import Ronaldo from "../Images/ronaldo.jpg";
import Messi from "../Images/messi.jpeg";
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
           <p><b><NavLink to={"/"+user.username} style={{color:"black"}}>{user.username}</NavLink></b> </p>
            <p>{user.name}</p>
          </div>  
          <Link> <button className="post-btn" onClick={showCreatePost}><img src={PostIcon} /></button> </Link>
        </div>

        <div className="suggestion-box">
            <div >
              Suggestions for you
            </div>
            <div className="suggested-people">
                  <SuggestedPeople username="i_billgates" name="Bill Gates" image={BillGates} />
                  <SuggestedPeople username="musk_melon" name="Elon Musk" image={Elon}/>
                  <SuggestedPeople username="Ronaldo_07" name="Christiano Ronaldo" image={Ronaldo}/>
                  <SuggestedPeople username="Lionel_10" name="Lionel Messi" image={Messi}/>
            </div>
        </div>
        <div className="copyrightbox">
        &#169;2021 Instogram by iShubhamRana
        </div>
        </div>
        
    );
}
export default SideProfile;