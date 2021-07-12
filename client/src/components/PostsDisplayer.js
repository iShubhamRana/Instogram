import React, { useEffect, useRef, useState } from "react";
import HomePost from "./HomePost.js";
import Loader from "./Loader.js";
import { useSelector } from "react-redux"; 
import axios from "axios";
import Home from "./Home.js";
const PostsDisplayer=({User})=>{

    // const [randomUser,setRandomUser]=useState(null);  //randomly generates numer inside the array size and fetches posts for that User
    const randomUser=useRef(null);
    
   
    
    const [posts,setPosts]=useState([]);
    const [fetchFlag,setfetchFlag]=useState(0);

    window.onscroll = function() {
        var totalPageHeight = document.body.scrollHeight;    
     
        var scrollPoint = window.scrollY + window.innerHeight;
    
        if(scrollPoint >= totalPageHeight)
        {
            setfetchFlag(fetchFlag+1);
        }
    }
  
   useEffect(()=>{
       
       if(User.username==null){

           setfetchFlag(fetchFlag+1);
       }
       if(User.username){
          if(User.following.total==0){

          }
          else{         
          randomUser.current=Math.floor((Math.random() * User.following.by.length - 1) + 1);
          axios.post("/getfeedpost",{
              user:User.following.by[randomUser.current]
          }).then((response)=>{
             console.log(response.data);
             setPosts((Posts)=>{
                return [...Posts,response.data]
             })
             
          }).catch(()=>{

          })
       }
       }
   },[fetchFlag]);

    
    return (
        <div className="PostsDisplayer">
            {posts.length!=0 
                ?
                posts.map((post,index)=>{
                   console.log(post);
                  return   <HomePost key={index} post={post} User={User} />
                })
              
                :<Loader />
                

            }
            {
                (User.username && User.following.total==0) && 
                <h1>You don't follow anyone.<br></br>Follow people to see amazing posts !!</h1>
            }
           
             
        </div>
    );

}
export default PostsDisplayer;
