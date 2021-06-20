import axios from "axios";
import React from "react";
import Toast from "../components/Toast";

const uploadPost=(username,Image,Caption)=>{

   axios.post("/newpost",{
       
       username:username,
       Image:Image,
       Caption:Caption
   }).then((response)=>{
    Toast(response.data.message,1);
    document.getElementById("CreatePost").style.display="none";
   }).catch((err)=>{
    Toast(err.response.data.error,2);
    document.getElementById("CreatePost").style.display="none";
   });
}
export default uploadPost;