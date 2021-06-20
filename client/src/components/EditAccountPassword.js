import React from "react";
import Navbar from "./Navbar";
import "../css/edit-account.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";


const EditAccountPasword = () => {
  const User = useSelector((state) => { return state.currentUser })
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
                 </div>
            </div>

              <div className="input-box">
                <span><b>Old Password</b></span>
                <input name="OldPassword"></input>
              </div>

              <div className="input-box">
                <span><b>New Password</b></span>
                <input name="newPassword"></input>
              </div>

              <div className="input-box">
                <span><b>Confirm Password</b></span>
                <input name="ConfirmPassword"></input>
              </div>

            <button className="edit-account-btn">
              Change Password
            </button>
              
            </form>
        </div>

      </div>
    </>
  );
}
export default EditAccountPasword;