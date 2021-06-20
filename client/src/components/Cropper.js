import React, {useState} from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import "../css/Cropper-CreatePost.css"
const Cropper=(props)=>{
    const [crop, setCrop] = useState({ aspect: 1/ 1 });
    const [image,setImage]=useState(null);
    const [result,setResult]=useState(null);
    function getCroppedImg(cropFinish) {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');
      
        ctx.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height,
        );
        const base64Img= canvas.toDataURL("image/jpeg");
        setResult(base64Img);
        cropFinish(base64Img); //invoking function in createPost
        }
    
  
    
    return (
    <>
    <div className="cropper">
    <ReactCrop className="crop-box" src={props.src} onImageLoaded={setImage} crop={crop} onChange={newCrop => setCrop(newCrop)} />
    {image && <button type="submit" className="createPost-btn" onClick={()=>{getCroppedImg(props.onCropFinish)}}>Done</button>}
       
    </div>
    </>
    );
}

export default Cropper;