import React from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import "../css/Homepost.css";
import LikeIcon from "../Images/like.png";
import CommentIcon from "../Images/speech-bubble.png";
import ShareIcon from "../Images/share.png";
import BookMark from "../Images/bookmark.png";
const HomePage=()=>{
    const User=useSelector((state)=>{return state.currentUser});
    console.log(User);
    return (
            <> 
            <div className="home-post-container">
                <div className="home-post-author">
                   <div>
                   <img src="https://source.unsplash.com/random" />
                   </div>
                   <div >
                       <Link>i_shubham_rana</Link>
                   </div>
                </div>
                <div className="home-post-image">
                    <img src="https://source.unsplash.com/random" />
                </div>
                <div className="home-post-reaction">
                    <div className="home-post-like">
                       <div>
                           <img src={LikeIcon} />
                           <img src={CommentIcon} />
                           <img src={ShareIcon} />
                       </div>
                       <div>
                            <img src={BookMark} />
                       </div>
                    </div>
                    <span>10 likes</span>
                    <span>view all 2 comments</span>
                    <form>
                        <input  type="text" placeholder="Add a comment"></input>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
            </>
            );
}
export default HomePage;