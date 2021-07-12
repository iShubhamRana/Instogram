import React from "react";
import {Link} from "react-router-dom"
const SuggestedPeople=(props)=>{
    return (
    <div >
        <div>
            <img src={props.image} />
        </div>
        <div>
            <span><Link to={"/"+props.username}
            style={{color:"black"}} ><b>{props.username}</b></Link></span>
            <span>{props.name}</span>
        </div>
    </div>)
}
export default SuggestedPeople;