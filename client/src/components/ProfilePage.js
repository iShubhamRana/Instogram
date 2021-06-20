import React , {useEffect, useState} from "react";
import Navbar from "./Navbar";
import {useParams,useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import axios from "axios";
import ProfilePagePost from "./ProfilePagePost";
import { setUser } from "../actions";
import Loader from "./Loader";
import Modal from "./Modal";
import {Link} from "react-router-dom";
import "../css/profilepage.css";


const ProfilePage=(props)=>{
    const loggedUser=useSelector((state)=>{return state.currentUser});
    const {username}=useParams();
    const [userInPage,setUserInPage]=useState(null);
   
    const history=useHistory();
    useEffect(()=>{
        if(userInPage==null){
        axios.post("/getprofile",{
            "username":username
        }).then((response)=>{
            setUserInPage(response.data.user);
        }).catch((err)=>{
            console.log(err);
        })
    }
    },[userInPage])
    
   
    
    return (
    <>
      <Navbar />
      
        
      {userInPage ? 
        <div className="ProfilePage">
          <div className="Profile-Displayer">
            <div className="Profile-pic">
                <img src={userInPage.profile_pic}/>
            </div>
            <div className="Profile-info">
                <div className="username-container">
                    <span>{userInPage.username}</span>
                    {(loggedUser.username===userInPage.username) 
                    ? <Link to="accounts/edit"><button className="edit-profile">Edit Profile</button></Link>
                    : <button className="follow-btn">Follow</button>

                    }
                </div>
                <div className="posts-info">
                    <span><b>{userInPage.Post.total}</b> posts</span>
                    <span><b>{userInPage.followers.total}</b> followers</span>
                    <span><b>{userInPage.following.total}</b> following</span>
                </div>
                <div className="bio-container">
                <p><b>{userInPage.name}</b></p>
                <p>{userInPage.bio}</p>

                </div>
            </div>
          </div>
          <hr></hr>
          <h4>Posts</h4>
          <div className="Posts-Displayer">
          
                    {userInPage.Post.Posts.map((post)=>{
                      return <ProfilePagePost post={post} />
                    })}
          </div>
      </div>
      :
        <Loader />

      }
      
    </>
    )
}
export default ProfilePage;