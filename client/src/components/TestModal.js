import React from "react";
import Modal from "./Modal";
import {useHistory, useParams,useLocation} from "react-router-dom"
import CreatePost from "./CreatePost";

const TestModal=(props)=>{
    const history=useHistory();
    
    const param=history.location.search; 
    console.log(param);
    
const show="shubham";

    return (<>
     {param=="?createpost" && <Modal show="shubham" children={
         <div className="CreatePost">
             <hi>This is createPost</hi>
         </div>

         
     } />  }
     
    
         
    </>);
}
export default TestModal;