import React from "react";
import Navbar from "./Navbar";
import "../css/edit-account.css";
import { NavLink } from "react-router-dom";
import {useSelector } from "react-redux";
const EditAccount = () => {
  const User=useSelector((state)=>{return state.currentUser});
  console.log(User);
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
                    <span>Change profile pic</span>
                 </div>
              </div>

              <div className="input-box">
                <span><b>Name</b></span>
                <input name="Name" value={User.name}></input>
              </div>
                <p>
                Help people discover your account by using the name you're known by: either your full name, nickname, or business name.
                </p>
              <div className="input-box">
                <span><b>Username</b></span>
                <input name="Username" value={User.username}></input>
              </div>
              <p>
                This is used to uniquely identify on Instogram
              </p>

              <div className="input-box">
                <span><b>Bio</b></span>
                <input name="Bio" value={User.bio}></input>
              </div>

              <div className="input-box">
                <span><b>Email</b></span>
                <input name="Email" value={User.bio}></input>
              </div>
              <button className="edit-account-btn" type="submit">Submit</button>
            </form>
        </div>

      </div>
    </>
  );
}
export default EditAccount;