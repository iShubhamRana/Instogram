import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {useDispatch,useSelector} from "react-redux";
import {signupChanges} from "../actions/index";
import ExecuteSignup from "../api/ExecuteSignup";
import "../css/Signup.css";
const Signup=()=>{
    const userState=useSelector((state)=>{return state.signupFormChange})
    const dispatch=useDispatch();
    return (<>
       <div id="signup-box">
           <div id="signup-info">
                <h2>Instogram</h2>
                <p>Signup to see photos and videos from your friends</p>
                <div id="fb-signup">
                    <a href="#">Login with Facebook</a>
                </div>
                <div id="or"><hr></hr> OR <hr></hr></div>
                <form className="signup-form">
                    <input type="email" placeholder="Email" name="semail"  required onChange={(e)=>{dispatch(signupChanges(e.target.name,e.target.value))}}></input>
                    <input type="text" placeholder="Full name" name="sname" required onChange={(e)=>{dispatch(signupChanges(e.target.name,e.target.value))}}></input>
                    <input type="text" placeholder="Username" name="susername" required onChange={(e)=>{dispatch(signupChanges(e.target.name,e.target.value))}}></input>
                    <input type="text" placeholder="Password" name="spassword" required onChange={(e)=>{dispatch(signupChanges(e.target.name,e.target.value))}}></input>
                    <button id="signup" type="submit" onClick={(e)=>{ExecuteSignup(e,userState)}}>Signup</button>
                </form>
               <p> By signing up, you agree to our Terms , Data Policy and Cookies Policy .</p>
           </div>
           <div id="gotoLogin">
                Have an account? <NavLink to="/">Login</NavLink>
           </div>
     
       </div>
    </>);
};

export default Signup;