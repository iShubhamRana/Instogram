import React,{useState , useEffect} from "react";
import {useSelector} from "react-redux";
import {Link, Redirect} from "react-router-dom";
import "../css/Homepost.css";
import LikeIcon from "../Images/like.png";
import RedLikeIcon from "../Images/../Images/heart.png";
import CommentIcon from "../Images/speech-bubble.png";
import ShareIcon from "../Images/share.png";
import BookMark from "../Images/bookmark.png";
import LikeHeart from "../Images/../Images/favorite_white_24dp.svg";
import axios from "axios";
import Loader from "./Loader";
const HomePost=({post})=>{

     const User= useSelector((state)=>{return state.currentUser})
     const [liked,setLiked]=useState(false);//maintains state of if liked the pic or not
     const [likes,setLikes]=useState(0);
     //used likes usestate because here we can't fetch post again because its a prop
     const likeAnimation=()=>{
      const heart= document.getElementsByClassName("LikeHeart");      
      heart[0].classList.add("makepop");
      setTimeout(()=>{
      heart[0].classList.remove("makepop");
      },600)     
      proceedLike();
    }
    
    useEffect(()=>{
        if(post.post)
       { const checkLiked=()=>{
            if(post.post.likes.by.includes(User._id)){
                setLiked(true);
                return ;
            }
           
        }
        checkLiked();
        if(likes==0){
            setLikes(post.post.likes.total);
        }}
    },[liked])

    const proceedLike=()=>{  
                    
        if(liked==false){ 
        setLiked(!liked);   
        setLikes(likes+1);
        axios.post("/likepost",{
            postId:post.post._id,
            by:User._id                
        }).then((response)=>{
           
        }).catch((err)=>{
            
        })
       }
      }
    
     const proceedUnlike=()=>{
        setLiked(false);
        setLikes(likes-1);
        axios.post("/unlikepost",{
            postId:post.post._id,
            by:User._id
        }).then((response)=>{
          
        }).catch((err)=>{
            
        })
        
    }

    return (
            <> 
            
            {post.post 
            ?
            <div className="home-post-container" >
                <div className="home-post-author">
                   <div>
                   <img src={post.profile_pic} />
                   </div>
                   <div >
                       <Link to={"/"+post.postAuthor}>{post.postAuthor}</Link>
                   </div>
                </div>
                <div className="home-post-image">
                    <img src={post.post.image} onDoubleClick={likeAnimation} />
                    <img className="LikeHeart" src={LikeHeart} />
                </div>
                <div className="home-post-reaction">
                    <div className="home-post-like">
                       <div>
                       { !liked ?<img  className="icon-home"  src={LikeIcon} onClick={proceedLike} />
                                :<img  className="icon-home" src={RedLikeIcon} onClick={proceedUnlike} />

                       }
                           
                        <Link to={"/"+post.postAuthor+'/p/'+post.post._id}>  <img className="icon-home"  src={CommentIcon} /></Link> 
                        <Link to={"/"+post.postAuthor+'/p/'+post.post._id}> <img className="icon-home"  src={ShareIcon} /></Link>
                       </div>
                       <div>
                            <img src={BookMark} />
                       </div>
                    </div>
                    <span>{likes} likes</span>
                    <span><b>{post.postAuthor}</b>&nbsp;&nbsp;{post.post.caption}</span>
                    <span>
                        {(post.post.comments.total==0) 
                        ? <>No comments</>
                        : <>Show all {post.post.comments.total} comments</>}
                    </span>
                    <Link to={"/"+post.postAuthor+'/p/'+post.post._id}>
                    <form>
                       
                        <input  type="text" placeholder="Add a comment"></input>
                        <button type="submit">Submit</button>
                    
                    </form>
                    </Link>
                </div>
            </div>
            :
            <>
            <Loader />
            
            </>
            }
         
           
            
            </>
            );
}
export default HomePost