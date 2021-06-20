import React , {useEffect} from "react";
import AppStore from "../Images/appstore.png";
import PlayStore from "../Images/playstore.png";
import Instagram from "../Images/instagram.webp"
import { NavLink } from 'react-router-dom';
import {useSelector,useDispatch} from "react-redux";
// import {emailChange, passwordChange} from "../actions/index";
import {loginChanges} from "../actions/index";
import ExecuteLogin from "../api/ExecuteLogin";
import {ToastContainer} from "react-toastify";


import '../css/Login.css';
const Login = ()=>{
    
    const dispatch = useDispatch();
    const userState= useSelector((state)=>{ return state.changeLoginForm});
    
    return (
        <>
         <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          />
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