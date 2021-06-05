//api calls for signup page
import axios from "axios";
import { toast } from "react-toastify";
import Toast from "../components/Toast";
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
    }).catch((err)=>{
        Toast(err.response.data.error,2);
        // Toast(err.);
    });
    
    
   
}
export default ExecuteSignup;
