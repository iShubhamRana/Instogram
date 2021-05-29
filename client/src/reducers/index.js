import {changeLoginForm} from "./loginFormChange.js";
import {signupFormChange} from "./signupFormChange";
import { combineReducers } from "redux";

const rootReducer= combineReducers({
    changeLoginForm,
    signupFormChange
})
export default rootReducer;