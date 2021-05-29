import React , {useEffect} from "react";
import AppStore from "../Images/appstore.png";
import PlayStore from "../Images/playstore.png";
import Instagram from "../Images/instagram.webp"
import { NavLink } from 'react-router-dom';
import {useSelector,useDispatch} from "react-redux";
// import {emailChange, passwordChange} from "../actions/index";
import {loginChanges} from "../actions/index";
import login from "../api/login";


import '../css/Login.css';
const Login = ()=>{
    
    const dispatch = useDispatch();
    const userState= useSelector((state)=>{ return state.changeLoginForm});
    
    return (
        <>
          <div id="login-container">
              <div>
                    <img src={Instagram} />
              </div>
              <div>
                  <div id="login-box">
                      <h1>Instogram</h1>
                      <form className="">

                          <input type="email"  name="email"  required placeholder="Email" onChange={(e)=>{dispatch(loginChanges(e.target.name,e.target.value)) }} />
                          <input type="password" name="password" required placeholder="Password" onChange={(e)=>{dispatch(loginChanges(e.target.name,e.target.value))}}/>
                          <button type="submit" onClick={()=>{login()}} >Log in</button>
                          <div ><hr /><span>OR</span> <hr /> </div>
                      </form>
                      <div id="fb-login">
                         <a> Login with facebook </a>
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