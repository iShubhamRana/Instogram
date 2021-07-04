import React  from "react";
import { Route, Switch } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Login from "./components/Login";
import Signup from './components/Signup';
import PrivateRoute from "./routes/PrivateRoute";
import Home from "./components/Home";
import ProfilePage  from './components/ProfilePage';
import EditAccount from "./components/EditAccount";
import EditAccountPassword from "./components/EditAccountPassword";
import { useLocation } from "react-router-dom";



// import {Switch} from "react-router-dom";

function App() {
  const location=useLocation();
  
  return (
    <div className="App">
      <Switch >
        <Route exact path="/" component={()=>{return <Login />}} /> 
        <Route exact path="/signup" component={()=>{return <Signup />}} />       
        <Route exact path="/home" component={PrivateRoute} /> 
        <Route exact path="/accounts/edit" component={PrivateRoute} />
        <Route exact path="/accounts/password/change" component={PrivateRoute} />      
        <Route  path="/:username" component={PrivateRoute} />

      </Switch>     
      
       <ToastContainer /> 
     </div>
     
  );
}

export default App;
