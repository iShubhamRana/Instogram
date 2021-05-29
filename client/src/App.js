
import { Route, Switch } from 'react-router';
import './App.css';
import Login from "./components/Login";
import Signup from './components/Signup';
// import {Switch} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={()=>{return <Login />}} /> 
        <Route exact path="/signup" component={()=>{return <Signup />}} />

        
      </Switch>
    </div>
  );
}

export default App;
