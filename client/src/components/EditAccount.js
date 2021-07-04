import React, { useEffect, useReducer, useState } from "react";
import Navbar from "./Navbar";
import "../css/edit-account.css";
import { NavLink } from "react-router-dom";
import {useSelector } from "react-redux";
import axios from "axios";
import Toast from "./Toast";
import {useDispatch} from "react-redux";
import {setUser} from "../actions/index";

const reducer=(state,action)=>{
    switch(action.type){
      case "Name": return {...state,name:action.payload.value};
      case "Username": return {...state,username:action.payload.value};
      case "Bio": return {...state,bio:action.payload.value};
      case "Email": return {...state,email:action.payload.value};
      case "ProfilePic": return {...state,profile_pic:action.payload.value}
      default: return state;
    }
}
const EditAccount = () => {

  const User=useSelector((state)=>{return state.currentUser});
  const [count,setCount]=useState(0); //to stop useEffct from uploading on the load of page
  const initialState={
    id:User._id,  
    name:User.name,
    email:User.email,
    username:User.username,
    bio:User.bio,
  }
  const [filledInfo,dispatch]=useReducer(reducer,initialState);
  
  
  //the function of this state is to check if the user has uploaded a new profile pic so  that we can display it right there and not after submitting the form.When shet false we eill display the initial profile pic and on uploading we will dhow the new profilepic
  const [profilePic,setProfilepic]=useState(null);

  const handleProfileInput=(e)=>{
      const f= new FileReader;
      f.readAsDataURL(e.target.files[0]);  
      f.onload=(e)=>{
        setProfilepic(e.target.result);
      }
  }

  const handleInputChanges=(e)=>{
    dispatch({type:e.target.name , payload:{value:e.target.value}});
  }

 
  
  const uploadChanges=(e)=>{
    e.preventDefault();
    //upload image to cloudinary
    if(profilePic !=null){
         axios.post(process.env.REACT_APP_CLOUDINARY_UPLOAD,{
          "upload_preset": process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
          "cloudname": process.env.REACT_APP_CLOUDINARY_UPLOAD_CLOUDNAME,
          "file":profilePic
        }).then((response)=>{
          //make  change in filledInfo which is to be uploaded
          dispatch({type:"ProfilePic",payload:{value:response.data.url}})    
          setProfilepic(response.data.url);
              
        }).catch(err=>{
          console.log(err);
        })
   }
   else
        dispatch({type:"ProfilePic",payload:{value:User.profile_pic}})
  }

  const dispatch2=useDispatch();
 //to detect the change in profile_pic
 //but we don't want to do the upload stuff in first go as useEffect wil run on load also
  useEffect(()=>{
      if(count==0)
      setCount(1);
      else{
         axios.post("/updateProfile",filledInfo).
         then((response)=>{
          Toast(response.data.message,1);
          dispatch2(setUser(response.data.user));
         }).catch((err)=>{
          Toast(err.response.data.error,2);
         })
      }
      
  },[filledInfo.profile_pic]);


  return (
    <>
      <Navbar />
      <div className="account-edit-container">
        <div className="sidebar">
          <div className="sidebar-option">
            <NavLink to="/accounts/edit" style={{ color: "black" }}
              className="nav-links" activeClassName="active">Edit Profile</NavLink>
          </div>
          <div className="sidebar-option">
            <NavLink to="/accounts/password/change" style={{ color: "black" }}
              className="nav-links" activeClassName="active">Change Password </NavLink>
          </div>

        </div>


        <div className="edit-box">
            <form>
              <div className="input-box">
                {!profilePic && <img src={User.profile_pic} />}
                { profilePic && <img src={profilePic} />}
                 
                 <div className="profile-pic-changer">
                    <span>{User.username}</span>
                    <span >
                    <input type="file" name="Profile_pic" accept="image/*" onChange={handleProfileInput} />
                    <p>  Change profile pic</p>
                    </span>
                 </div>
              </div>

              <div className="input-box">
                <span><b>Name</b></span>
                <input name="Name" defaultValue={User.name} onChange={handleInputChanges}></input>
              </div>
                <p>
                Help people discover your account by using the name you're known by: either your full name, nickname, or business name.
                </p>
              <div className="input-box">
                <span><b>Username</b></span>
                <input name="Username" defaultValue={User.username} onChange={handleInputChanges}></input>
              </div>
              <p>
                This is used to uniquely identify on Instogram
              </p>

              <div className="input-box">
                <span><b>Bio</b></span>
                <input name="Bio" defaultValue={User.bio} onChange={handleInputChanges}></input>
              </div>

              <div className="input-box">
                <span><b>Email</b></span>
                <input name="Email" defaultValue={User.email} onChange={handleInputChanges}></input>
              </div>
              <button className="edit-account-btn" type="submit" onClick={uploadChanges}>Submit</button>
            </form>
        </div>

      </div>
    </>
  );
}
export default EditAccount;