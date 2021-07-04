import React from "react";
import Navbar from "./Navbar";
import "../css/edit-account.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useReducer } from "react";
import Toast from "./Toast";
import axios from "axios";

const reducer=(state,action)=>{
   switch(action.type){
     case "oldPassword": return {...state,oldPassword:action.payload.value}
     case "newPassword": return {...state,newPassword:action.payload.value}
     case "confirmPassword": return {...state,confirmPassword:action.payload.value}
     default: return state;
   }
}


const EditAccountPasword = () => {
  const User = useSelector((state) => { return state.currentUser })
  const [filledInfo,dispatch]=useReducer(reducer,{});
  //for any inputfield changes
  const handleChanges=(e)=>{
    dispatch({type:e.target.name, payload:{value:e.target.value}});
  }

  const uploadChanges=(e)=>{
    e.preventDefault();
    if(filledInfo.newPassword != filledInfo.confirmPassword)
    Toast("New password and confirm password don't match",2);
    else{
      axios.post("/changePassword",{
        ...filledInfo, id:User._id
      }).
      then((response)=>{
        Toast(response.data.message,1);
      }).catch((err)=>{
        Toast(err.response.data.error,2);
      })
    }

  }

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
                 <img src={User.profile_pic} />
                 <div className="profile-pic-changer">
                    <span>{User.username}</span>
                 </div>
            </div>

              <div className="input-box">
                <span><b>Old Password</b></span>
                <input name="oldPassword" type="password" onChange={handleChanges} required ></input>
              </div>

              <div className="input-box">
                <span><b>New Password</b></span>
                <input name="newPassword" type="password" onChange={handleChanges} required></input>
              </div>

              <div className="input-box">
                <span><b>Confirm Password</b></span>
                <input name="confirmPassword" type="password" onChange={handleChanges} required></input>
              </div>

            <button className="edit-account-btn" type="submit" onClick={uploadChanges}>
              Change Password
            </button>
              
            </form>
        </div>

      </div>
    </>
  );
}
export default EditAccountPasword;