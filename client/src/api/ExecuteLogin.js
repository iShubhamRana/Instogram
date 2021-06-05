import axios from "axios";
//api calls for login page
import Toast from "../components/Toast";

const ExecuteLogin= async(e,user)=>{
  e.preventDefault();
  const {username,password}=user;
  
  const response= await axios.post("/login",{
    username,password
   }).then((response)=>{
    Toast(response.data.message,1);
   }).catch((err)=>{
     if (err.response.status==401)
      Toast("Invalid credentials",2);   
     else 
      Toast("Network issue");
   })


}



export default ExecuteLogin;