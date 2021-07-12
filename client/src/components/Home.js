import React from "react";
import {useSelector} from "react-redux";
import SideProfile from "./SideProfile";
import PostsDisplayer from "./PostsDisplayer";
import Navbar from "./Navbar";
import { Route } from "react-router-dom";
import "../css/Home.css";
import  CreatePost from "./CreatePost";


const Home=()=>{

    const user= useSelector((state)=>{return state.currentUser})
    
    return (
       <>   
     
        <Navbar />
        
        <CreatePost />
        <div className="Home">
            <PostsDisplayer User={user}/>
            <SideProfile />
        </div>
        
        </>
    );
}

export default Home;
