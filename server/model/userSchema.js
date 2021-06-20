const mongoose = require("mongoose");
const passportLocalMongoose=require("passport-local-mongoose");
// const POst=require("./postSchema");
//This is the schema of main user and is populated by ohter schema..
//postSchema
//commentSchema

const userSchema=mongoose.Schema({
    name:String,
    email:String,
    username:String,
    password:String,
    facebook_id:String,
    profile_pic:{
      type:String,
      default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHXi6kWCo1P3qJAuOnEAs6jWS1Dg1BqRkk8Q&usqp=CAU"
    },
    bio:{
      type:String,
      default:"Hey there I am using Instogram"
    },
    followers:{
        total:{
          type:Number,
          default:0  
        },
        by:[{type:mongoose.Schema.Types.ObjectId, ref: 'User'}]  
    },
    following:{
        total:{
            type:Number,
            default:0  
          },
        by:[{type:mongoose.Schema.Types.ObjectId, ref: 'User'}] 
    },
    Post:{
        total:{
            type:Number,
            default:0  
          },
        Posts:[{type:mongoose.Schema.Types.ObjectId, ref: 'Post'}]
    }

});


userSchema.plugin(passportLocalMongoose);
const User = new mongoose.model('User',userSchema);

module.exports=User;

