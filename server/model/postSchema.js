const mongoose = require("mongoose");
const passportLocalMongoose=require("passport-local-mongoose");
const postSchema=mongoose.Schema({
    User:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    date:Date,
    image:{
        type:String,
        required:true
    },
    caption:{
        type:String,
        default:''
    },
    likes:{
        total:{
            type:Number,
            default:0  
          },
        by:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]        
    },
    comments:{
        total:{
            type:Number,
            default:0  
          },
        comment:{
         type: mongoose.Schema.Types.ObjectId, ref: 'User' 
        }
    }
    
});


postSchema.plugin(passportLocalMongoose);
const Post = new mongoose.model('Post',postSchema);

module.exports=Post;