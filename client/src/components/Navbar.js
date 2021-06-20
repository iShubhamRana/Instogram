import React from "react";
import {NavLink} from "react-router-dom";
import HomeIcon from "../Images/home_black_24dp.svg";
import MessageIcon from "../Images/send_black_24dp.svg";
import HeartIcon from "../Images/favorite_border_black_24dp.svg";
import ExploreIcon from "../Images/explore_black_24dp.svg";
import AccountIcon from "../Images/account_circle_black_24dp.svg"
const Navbar=()=>{

    return (
        <div className="Navbar">
            <div className="Navbar-content">
                <h1>Instogram</h1>
                <input type="text" placeholder="search"></input>
                <div className="icons">
                <NavLink to="/home" class="material-icons-outlined"><img src={HomeIcon}/></NavLink>
                <NavLink to="/home" class="material-icons-outlined"><img src={MessageIcon}/></NavLink>
                <NavLink to="/home" class="material-icons-outlined"><img src={HeartIcon}/></NavLink>
                <NavLink to="/home" class="material-icons-outlined"><img src={ExploreIcon}/></NavLink>
                <NavLink to="/home" class="material-icons-outlined"><img src={AccountIcon}/></NavLink>
                </div>
            </div>
        </div>
    );

}
export default Navbar;