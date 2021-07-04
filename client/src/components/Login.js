import React , { useState} from "react";
import AppStore from "../Images/appstore.png";
import PlayStore from "../Images/playstore.png";
import Instagram from "../Images/instagram.webp"
import { NavLink ,Redirect,Route} from 'react-router-dom';
import {useSelector,useDispatch} from "react-redux";
import {loginChanges} from "../actions/index";
import axios  from "axios";
import Toast from "./Toast";


import '../css/Login.css';
const Login = ()=>{
    const [loggedIn,setLoggedIn]=useState(false);


    const ExecuteLogin= (e,user)=>{
        e.preventDefault();
        const {username,password}=user;        
         axios.post("/login",{
          username,password
         }).then((response)=>{
          Toast(response.data.message,1);
             setLoggedIn(true);
         }).catch((err)=>{
           if (err.response.status==401)
            Toast("Invalid credentials",2);   
           else 
            Toast("Network issue");
            return 0;
         })
         
          
      }




    
    const dispatch = useDispatch();
    const userState= useSelector((state)=>{ return state.changeLoginForm});

    return (
        <>
       
         {loggedIn && <Redirect to="/home" />}
          <div id="login-container">
              <div>
                    <img src={Instagram} />
              </div>
              <div>
                  <div id="login-box">
                  
                      <h1>Instogram</h1>
                      <form className="">   
                          <input type="text"  name="username"  required placeholder="Username" onChange={(e)=>{dispatch(loginChanges(e.target.name,e.target.value)) }} />
                          <input type="password" name="password" required placeholder="Password" onChange={(e)=>{dispatch(loginChanges(e.target.name,e.target.value))}}/>
                          <button type="submit" onClick={(e)=>{ExecuteLogin(e,userState)}} >Log in</button>
                          <div ><hr /><span>OR</span> <hr /> </div>
                      </form>

                      <div id="fb-login">
                         <a href="http://localhost:3001/auth/facebook">Login with facebook </a>
                      </div>

                  </div>
                  <div id="login-signup">
                      Don't have an account? <NavLink to="/signup">Signup</NavLink>
                  </div>
                  <div className="get-apps">
                      <p>Get the app</p>
                      <img src={AppStore}  />
                      <img src={PlayStore}  />
                  </div>
              </div>
             
          </div>
       
        </>
    );
}
export default Login;