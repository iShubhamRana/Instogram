import axios from "axios";
import React,{useEffect,useState} from "react";
import {useLocation, useParams,Link, useHistory} from "react-router-dom";
import "../css/mainpost.css";
import LikeIcon from "../Images/like.png";
import CommentIcon from "../Images/speech-bubble.png";
import ShareIcon from "../Images/share.png";
import BookMark from "../Images/bookmark.png";
import Like2 from "../Images/favorite_white_24dp.svg";
import RedHeart from "../Images/heart.png";
import {useSelector} from "react-redux";
import Toast from "./Toast";
import LikersModal from "./LikersModal";

const MainPost=()=>{
    const history=useHistory();
    const {username,id}=useParams();
    const [likers,showLikers]=useState(false); //to conditionally render show likers
    const [firstTime,setFirsttime]=useState(0);
    const [post,setPost]=useState(null);
    const [liked,setLiked]=useState(false);
    const User=useSelector((state)=>{return state.currentUser});
    const [comment,setComment]=useState();  
    //function to check if the user has already liked
    const checkLiked=(arr)=>{
        arr.forEach((obj)=>{
            if (obj._id===User._id){
            setLiked(true);
            return;
            }
        })
    }

    //the post will be fetched only once or after firstime is changed
    useEffect(()=>{ 
        console.log("loaded");
        axios.post("/getPost",{
            postId:id
        }).then((response)=>{
            setPost(response.data.post);
            console.log(response.data.post)
            checkLiked(response.data.post.likes.by);
        }).catch((err)=>{
            Toast(err.response.data.error,2);
        })
    },[firstTime]);

//for heart effect on doubleclick
    const popHeart=()=>{
      const heart= document.getElementsByClassName("heart-pop-image");      
      heart[0].classList.add("makepop");
      setTimeout(()=>{
      heart[0].classList.remove("makepop");
      },600)
      proceedLike();
    }

    const proceedLike=()=>{
              
            if(liked==false){ 
            setLiked(!liked);   
            axios.post("/likepost",{
                postId:id,
                by:User._id                
            }).then((response)=>{
                setFirsttime(firstTime+1);
            }).catch((err)=>{
                Toast(err.response.data.error,2);
            })
        }
    }

    const proceedUnlike=()=>{
        setLiked(!liked);
        axios.post("/unlikepost",{
            postId:id,
            by:User._id
        }).then((response)=>{
            setFirsttime(firstTime+1);
        }).catch((err)=>{
            
        })
        
    }
    
    const addComment=(e)=>{
        e.preventDefault();
        setComment('');
        axios.post("/addComment",{
            postId:id,
            text:comment,
            userId:User._id
        }).then((response)=>{
            setFirsttime(firstTime+1);
            
        }).catch((err)=>{
            
        })
    }


    return (
     <> 
        <div className="overlay_style" onClick={()=>{history.goBack()}}></div>
        {post &&
        <>
        <div className="main-post-box">
          <div className="main-post-image" onDoubleClick={popHeart}>
                 <img src={post.image} />
                 <div className="heart-pop">
                <img className="heart-pop-image" src={Like2} />
            </div>
          </div>
          <div className="main-post-other">
                <div className="author-box">
                    <div className="author-image">
                        <img src={post.User.profile_pic} />
                    </div>
                    <div className="author-info">
                        <Link to={"/"+post.User.username}>{post.User.username}</Link>
                         <p>{post.User.name}</p>
                    </div>
                    <div>
                        X
                    </div>
                    
                </div>
                <div className="comments-box">
                  <div className="author-caption">
                    <div>
                      <div className="author-image">
                          <img src={post.User.profile_pic} />
                      </div>
                      <p>
                          <Link>{post.User.username}</Link>&nbsp;&nbsp;&nbsp;
                          {post.caption}
                      </p>
                      </div>
                      <div className="date-container">
                          {post.date.slice(0,10)}
                      </div>
                  </div>

                  {/* author caption and comments have same css thats why we will use same classes */}

              {(post.comments.total==0)
                ?<p>No comments yet</p>
                :post.comments.by.map((comment)=>{
                 return  <div className="author-caption">
                    <div>
                      <div className="author-image">
                          <img src={comment.User.profile_pic} />
                      </div>
                      <p>
                          <Link to={"/"+comment.User.username}>{comment.User.username}</Link>&nbsp;&nbsp;&nbsp;
                          {comment.text}
                      </p>
                      </div>
                      <div className="date-container">
                          {comment.date.slice(0,10)}
                      </div>
                  </div>
                })
                }


                </div>
                <div className="reaction-box">
                   <div>
                    <div className="like-box">
                     {!liked 
                     ?  <img src={LikeIcon} onClick={proceedLike} />
                     :  <img src={RedHeart} onClick={proceedUnlike} />
                     }
                       
                        <img src={CommentIcon} />
                        <img src={ShareIcon} />

                    </div>
                    <div className="bookmark">
                        <img src={BookMark} />
                    </div>
                    </div>
                    <p className="like_number" onClick={()=>{
                        showLikers(true);
                    }}> {post.likes.total} likes</p>
                    <div className="add-comment">
                       <form>
                        <input type="text" value={comment} placeholder="Add a comment" required onChange={(e)=>{
                            setComment(e.target.value);
                        }} />
                        <button type="submit" onClick={addComment} >Post</button>
                        </form>
                    </div>
                    
                </div>
                
          </div>               
          
        </div>
        {likers && <LikersModal likers={post.likes.by} hide={()=>{showLikers(false)}}/>}
        </>
         }  
    </>);
}
export default MainPost;