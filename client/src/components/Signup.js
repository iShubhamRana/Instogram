import React, { useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import {useDispatch,useSelector} from "react-redux";
import {signupChanges} from "../actions/index";
import axios from 'axios';
import "../css/Signup.css";
import Toast from './Toast';

const Signup=()=>{

    const [signed,setSigned]=useState(false);

    
    const ExecuteSignup= async(e,user)=>{
        const email = user.semail;
        const name = user.sname;
        const username=user.susername;
        const password=user.spassword;
        e.preventDefault();
        
        const response = await axios.post("/signup",{
            email,name,username,password
        }).then((response)=>{
            Toast(response.data.message,1);
            setSigned(true);
        }).catch((err)=>{
            Toast(err.response.data.error,2);
            
        });    
        
       
    }




    const userState=useSelector((state)=>{return state.signupFormChange})
    const dispatch=useDispatch();
    return (<>
      {signed && <Redirect to="/home" />}
       <div id="signup-box">
           <div id="signup-info">
                <h2>Instogram</h2>
                <p>Signup to see photos and videos from your friends</p>
                <div id="fb-signup">
                    <a href="http://localhost:3001/auth/facebook">Login with Facebook</a>
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