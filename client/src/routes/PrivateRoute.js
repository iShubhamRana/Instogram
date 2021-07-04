import React,{useState, useEffect} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import axios from "axios";
import Toast from "../components/Toast";
import {setUser} from "../actions/index";
import Home from "../components/Home";
import ProfilePage from "../components/ProfilePage";
import EditAccount from "../components/EditAccount";
import EditAccountPasword from "../components/EditAccountPassword";
const PrivateRoute=(props)=>{
  const dispatch=useDispatch();
  const [logged,setLogged]=useState(true);
  const [count,setCount]=useState(0); 
  
//the count is to make sure the useEffect hook runs only once the component renders.
//else it will cause problems in each render

  useEffect(()=>{
    axios.get("/authenticate").then((response)=>{
      dispatch(setUser(response.data.user));
      setLogged(true);
      }).catch((err)=>{
      Toast(err.response.data.error,2);
      setLogged(false);
      });
  },[count]);
  
  //this will trigger useEffect only once .
  if(count==0){
    setCount(1);
  }
    
 
    const Component=props.component;
    return (
      (logged)?
        <>
         
          <Switch >
            
            <Route exact path="/accounts/edit" component={EditAccount} />
            <Route exact path="/accounts/password/change" component={EditAccountPasword} />
            <Route path="/home" component={Home} />
            <Route path="/:username" component={ProfilePage} />
          </Switch>
        </>
        :
        <Redirect to="/" />
    );

}


export default PrivateRoute;