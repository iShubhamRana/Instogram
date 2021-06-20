import React  from "react";
import { Redirect, Route, Switch } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Login from "./components/Login";
import Signup from './components/Signup';
import PrivateRoute from "./routes/PrivateRoute";
import Home from "./components/Home";
import ProfilePage  from './components/ProfilePage';
import Modal from "./components/Modal";
import TestModal from "./components/TestModal";
import EditAccount from "./components/EditAccount";
import EditAccountPassword from "./components/EditAccountPassword";


// import {Switch} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={()=>{return <Login />}} /> 
        <Route exact path="/signup" component={()=>{return <Signup />}} />       
        <PrivateRoute exact path="/home" component={Home} /> 
        <PrivateRoute exact path="/:username" component={()=>{return <ProfilePage />}} />
        <PrivateRoute exact path="/accounts/edit" component={()=>{return <EditAccount/> }} />
        <PrivateRoute exact path="/accounts/password/change" component={()=>{return <EditAccountPassword /> }} />
      </Switch>
      
       <ToastContainer /> 
     </div>
     
  );
}

export default App;
