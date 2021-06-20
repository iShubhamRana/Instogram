import {changeLoginForm} from "./loginFormChange.js";
import {signupFormChange} from "./signupFormChange";
import { combineReducers } from "redux";
import {currentUser} from "../reducers/currentUser";
const rootReducer= combineReducers({
    changeLoginForm,
    signupFormChange,
    currentUser
    
})
export default rootReducer;