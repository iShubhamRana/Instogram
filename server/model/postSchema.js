const mongoose = require("mongoose");
const passportLocalMongoose=require("passport-local-mongoose");
const User=require("./userSchema");
const Comment=require("./commentSchema");
const postSchema=mongoose.Schema({
    User:{type: mongoose.Schema.Types.ObjectId, ref: User.modelName},
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
        by:[{type: mongoose.Schema.Types.ObjectId, ref: User.modelName}]        
    },
    comments:{
        total:{
            type:Number,
            default:0  
          },
        by:[{
         type: mongoose.Schema.Types.ObjectId, ref:Comment.modelName 
        }]
    }
    
});


postSchema.plugin(passportLocalMongoose);
const Post = new mongoose.model('Post',postSchema);

module.exports=Post;