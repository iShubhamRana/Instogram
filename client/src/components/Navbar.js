import React from "react";
import {Link} from "react-router-dom";
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