import React from "react";
import "../css/loader.css";

const Loader=()=>{

    // Credits for loader
    // https://tobiasahlin.com/spinkit/


    return (
        <>
        {/* <div className="loader-wrapper"> */}
        <div className="spinner">
            <div className="rect1"></div>
            <div className="rect2"></div>
            <div className="rect3"></div>
            <div className="rect4"></div>
            <div className="rect5"></div>
         </div>
        {/* </div> */}
        </>
    );
}
export default Loader;