import React,{useState,useEffect} from "react";
import {useSelector,useDispatch} from "react-redux";
import SideProfile from "./SideProfile";
import PostsDisplayer from "./PostsDisplayer";
import { setUser } from "../actions/index";
import Cropper from "./Cropper";
import Navbar from "./Navbar";
import "../css/Home.css";
import  CreatePost from "./CreatePost";


const Home=()=>{

    const user= useSelector((state)=>{return state.currentUser})
   
    return (
        <>

        <Navbar />
        
        <CreatePost />
        <div className="Home">
            <PostsDisplayer />
            <SideProfile />
        </div>

        </>
    );
}

export default Home;
