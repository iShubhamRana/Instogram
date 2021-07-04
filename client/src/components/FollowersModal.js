import "../css/profilepage.css";
import {useHistory, useParams,Link, useLocation} from "react-router-dom";
import Loader from "./Loader";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
const FollowersModal=(props)=>{
    const [firstTime,setFirstTime]=useState(0);
    const location=useLocation()
    const [heading,setHeading]=useState();
    const {username}=useParams();
    
    const [followers,setFollowers]=useState(null);
    const history=useHistory();
    //we want useEffect to run only once
    useEffect(()=>{
        if(firstTime==0)
        {
        if(location.pathname.includes("followers")){
            setHeading("Followers");
        axios.post("/getFollowers",{
            username:username
         }).then((response)=>{
             setFollowers(response.data.followers);            
         }).catch((err)=>{
             
         })
        }
        
        else{
        setHeading("following");
        axios.post("/getFollowing",{
            username:username
         }).then((response)=>{
             setFollowers(response.data.following);             
         }).catch((err)=>{
             
         })
        }
        
    }

    },[firstTime])
    
    
    return (
        <>
       
        <div className="overlay_style" onClick={()=>{history.goBack()}}/>
            <div className="followers">
                <div className="followers-top">
                    <p>{heading}</p>
                </div>
                <div className="followers-list">

                    {followers ?
                        (! followers.length==0)?
                      followers.map((follower)=>{
                        return (
                            <div className="follower-card">
                             <div>
                              <img src={follower.profile_pic} />
                             </div>
                               <div>
                                    <Link to={"/"+follower.username}
                                    >{follower.username}</Link>
                                    <p>{follower.name}</p>
                               </div>
                            </div>
                        ) 
                        
                      })
                      : <p>No {heading}</p>
                    
                     :<Loader />}
                </div>  

            </div>
      </>
    )
}
export default FollowersModal;