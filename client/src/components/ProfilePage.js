import React , {useEffect, useState} from "react";
import Navbar from "./Navbar";
import {useParams,useHistory, Redirect, useLocation,Route, Switch} from "react-router-dom";
import {useSelector} from "react-redux";
import axios from "axios";
import ProfilePagePost from "./ProfilePagePost";
import Loader from "./Loader";
import {Link} from "react-router-dom";
import "../css/profilepage.css";
import Toast from "./Toast";
import UnfollowModal from "./UnfollowModal";
import FollowersModal from "./FollowersModal";
import MainPost from "./MainPost";


const ProfilePage=(props)=>{
    const url=props.match.url;  
    const loggedUser=useSelector((state)=>{return state.currentUser});
    const {username}=useParams();
    const [userInPage,setUserInPage]=useState(null);
    const [userFound,setUserFound]=useState(false); //to check if the user even exists
    const [unfollowModal,setUnfollowModal]=useState(false); //to show unfollow modal when needed
    
    const go=()=>{<Redirect to="/" />}
  
    useEffect(()=>{
       
        axios.post("/getprofile",{
            "username":username
        }).then((response)=>{
            setUserInPage(response.data.user);
        }).catch((err)=>{
           Toast(err.response.data.error,2);
           setUserFound(true);
        })
    
    },[userInPage])
    
    const manageFollow=()=>{
       axios.post("/newFollow",{
         follower:loggedUser,
         followed:userInPage
       }).then((response)=>{
          Toast(response.data.message,1);
          setUserInPage(null);   //triggers useEffect and the profile updates
       }).catch((err)=>{
          Toast(err.response.data.error,2);
       });
    }
    
    const unFollow=()=>{
      axios.post("/unfollow",{
        follower:loggedUser,
        followed:userInPage
      }).then((response)=>{
        Toast(response.data.message,1);
        setUserInPage(null);   //triggers useEffect and the profile updates
        setUnfollowModal(false);
      }).catch((err)=>{
        Toast(err.response.data.error,2);
       })
    }
    return (
    <>
    
      <Switch>
        <Route  path="/:username/followers"  component={FollowersModal}/>
        <Route  path="/:username/following"  component={FollowersModal}/>
        <Route  path="/:username/p/:id"      component={MainPost} />
      </Switch>
     
      {userFound && <Redirect to="/home" />}
      <Navbar />
      
      {userInPage ? 
        <div className="ProfilePage" >
          <div className="Profile-Displayer">
            <div className="Profile-pic">
                <img src={userInPage.profile_pic}/>
            </div>
            <div className="Profile-info">
                <div className="username-container">
                    <span>{userInPage.username}</span>
                    {(loggedUser.username===userInPage.username) 
                    ? <Link to="/accounts/edit"><button className="edit-profile">Edit Profile</button></Link>
                    :
                    
                    ( ! userInPage.followers.by.includes(""+loggedUser._id))
                     ? <button className="follow-btn" onClick={manageFollow}>Follow</button>
                     : <button className="follow-btn" onClick={()=>{setUnfollowModal(true)}} >Following</button>

                    }
                </div>
                <div className="posts-info">
                    <span><b>{userInPage.Post.total}</b> posts</span>
                    <span><Link to={url+"/followers"} style={{color:"black"}}><b>{userInPage.followers.total}</b> followers</Link></span>
                    <span><Link to={url+"/following"} style={{color:"black"}}><b>{userInPage.following.total}</b> following</Link></span>
                </div>
                <div className="bio-container">
                <p><b>{userInPage.name}</b></p>
                <p>{userInPage.bio}</p>

                </div>
            </div>
          </div>
          <hr></hr>
          {userInPage.Post.total===0 
            ?<h4>No Posts</h4>
            :<h4>Posts</h4>
          }
          
          <div className="Posts-Displayer">
          
                    {userInPage.Post.Posts.map((post,index)=>{
                      return <Link to={url+"/p/"+post._id}> <ProfilePagePost key={index} post={post} /></Link>
                    })}
          </div>
        
          {unfollowModal && <UnfollowModal profile_pic={userInPage.profile_pic} username={userInPage.username} unFollow={unFollow} hide={()=>{setUnfollowModal(false)}}/>}
          
          <div >

       
       </div>
       
      
      </div>
      :
        <Loader />
      
      
      }
      
    </>
    )
}
export default ProfilePage;