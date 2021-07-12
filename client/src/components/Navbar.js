import React,{useState} from "react";
import {Link} from "react-router-dom";
import HomeIcon from "../Images/home_black_24dp.svg";
import MessageIcon from "../Images/send_black_24dp.svg";
import HeartIcon from "../Images/favorite_border_black_24dp.svg";
import ExploreIcon from "../Images/explore_black_24dp.svg";
import AccountIcon from "../Images/account_circle_black_24dp.svg"
import axios from "axios";
import SuggestedPeople from "./SuggestedPeople";
const Navbar=()=>{
    const [value,setValue]=useState();
    const [show,setShow]=useState(false);
    const [foundUsers,setFoundUsers]=useState([]);
    const searchUsers=()=>{
        axios.post("/findUsers",{
            search:value
        }).then((response)=>{
            setShow(true);
            setFoundUsers(response.data.users);
        }).catch((err)=>{

        })
    }

    return (
        <div className="Navbar">
            <div className="Navbar-content">
                <h1>Instogram</h1>
                <div   className="search-bar">
                <div>
                  <input type="text" placeholder="search" value={value} onChange={(e)=>{
                      setValue(e.target.value);
                  }                    
                   }></input>
                <button className="search-btn" onClick={searchUsers}>&#128269;</button>
                </div>
                {show &&
                  <div className="result-box suggested-people">
                  <div>
                   <button onClick={()=>{
                       setShow(false)
                       setValue('');
                       setFoundUsers([]);
                       }}>&#x274C;</button>
                  </div>
                  {
                        foundUsers.map((user)=>{
                            return (
                                
                                <SuggestedPeople username={user.username} name={user.name} image={user.profile_pic}/>
                            );
                        })
                    }
                  </div>    
                }
                </div>

                <div className="icons">
                <Link to="/home" className="material-icons-outlined"><img src={HomeIcon}/></Link>
                <Link to="/home" className="material-icons-outlined"><img src={MessageIcon}/></Link>
                <Link to="/home" className="material-icons-outlined"><img src={HeartIcon}/></Link>
                <Link to="/home" className="material-icons-outlined"><img src={ExploreIcon}/></Link>
                <Link to="/home" className="material-icons-outlined"><img src={AccountIcon}/></Link>
                </div>
            </div>
        </div>
    );

}
export default Navbar;