import React, { useRef, useState } from "react";
import HomePost from "./HomePost.js";
import Loader from "./Loader.js";
import { useSelector } from "react-redux"; 
import axios from "axios";
const PostsDisplayer=()=>{

    // const randomUser=useRef();  //randomly generates numer inside the array size and fetches posts for that User

    // const User=useSelector((state)=>{return state.currentUser});
    // console.log(User);
    const [posts,setPosts]=useState(null);

    // const fetchNewPosts=()=>{


    //    randomUser=Math.floor((Math.random() * User.following.by.length-1) + 1);

    //    axios.post("getfeedpost",
    //    {user:randomUser}).then((response)=>{
    //        console.log(response);
    //    }).catch((err)=>{
    //        console.log(err);
    //    })

    // }

    // setInterval(()=>{
    //     fetchNewPosts();
    // },2000);

    return (
        <div className="PostsDisplayer">
            {posts 
                ?<HomePost />
                :<Loader />
            }
             
        </div>
    );

}
export default PostsDisplayer;