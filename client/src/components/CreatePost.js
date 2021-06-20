import React,{useEffect, useState} from "react";
import {useSelector} from "react-redux";
import "../css/Cropper-CreatePost.css";
import Cropper from "./Cropper";
import axios from "axios";
import uploadPost from "../api/uploadPost";
import {useHistory} from "react-router-dom";




const CreatePost=()=>{  
    const history=useHistory();
    const search=history.location.search
    const user= useSelector((state)=>{return state.currentUser})
    //the main uploaded picture will be saved here and crop operations will be done on copy of it named file. it will give user a chance to crop original image again if the crop is not satisfactory
    const [originalUploadPicture,setOriginalUploadPicture]=useState();
    
    //if we call the post api in the same fuction finishPost then even on updating state .. we will be able to use the old value only according to react ..therefore this will act as an indicator in combination with useEffect
    const [cloudinaryUploadDone,setCloudinaryUploadDone]=useState(false);

    useEffect(()=>{
        if(cloudinaryUploadDone==true){
        uploadPost(user.username,file,caption); //function in api/uploadPost
        setCloudinaryUploadDone(false);//for further uploads
        }
    },[cloudinaryUploadDone])

    const [file,setFile]=useState(false);
    //want crop is to check if the user wants to crop the image
    const [wantCrop,setwantCrop]=useState(false);
    const handleInput=(e)=>{
        const f=new FileReader();
        f.readAsDataURL(e.target.files[0]);   
        f.onload=(e)=>{
          setFile(e.target.result);
          setOriginalUploadPicture(e.target.result);
        }
    }
    //the function will get parameter from cropper component
    const cropFinished=(croppedImage)=>{
       setFile(croppedImage);
       setwantCrop(false);
    }
    

    //function handles post and uploads image to cloudinary
    const finishPost=(e)=>{
        e.preventDefault();
        axios.post("https://api.cloudinary.com/v1_1/a-jsb/image/upload",{
            "upload_preset": "d382ktke",
            "cloudname": "a-jsb",
            "file":file
        }).then((response)=>{
            setFile(response.data.url);       
            setCloudinaryUploadDone(true);//this will trigger useEffect
        }).catch(err=>{
            console.log(err);
        })
    }

    //will store the caption
    const [caption,setCaption]=useState('');




return (<>
       
            <div id="CreatePost" >
            <form>
            <input type="file" name="Image" accept="image/*" onChange={handleInput} required />
            

            {/* when the user clicks crop button state of want cro will change to conditonal render the belo components */}

            {!wantCrop &&<img src={file} className="" className="uploaded-img" />}

            {/* onCropFinish prop is used so that cropFinished function can be invoked from the cropper component */}

           {wantCrop && <Cropper  src={originalUploadPicture} onCropFinish={cropFinished}/>}
           
            <div className="CreatePost-lower">
         
            
            

            {!wantCrop &&   <button name="want-crop" className='createPost-btn' onClick={()=>{setwantCrop(true)}}>Crop</button>}
          
            <input type="text" name="Caption" placeholder="caption" onChange={(e)=>{setCaption(e.target.value)}}></input>
            <button type="submit" className="createPost-btn" name="post-btn" onClick={finishPost}>Post</button>
            </div>
            </form>
            </div>
        </>
);

}


export default CreatePost;