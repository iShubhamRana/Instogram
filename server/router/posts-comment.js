const express=require("express");
const User=require("../model/userSchema");
const POST=require("../model/postSchema");
//using POST to differentiate from Post field in userSchema
const router=express.Router();

router.post("/newpost",(req,res)=>{
    User.findOne({username:req.body.username},(err,user)=>{
        if(!err){
            const dummyPost= new POST({
                "User":req.user._id,
                "image":req.body.Image,
                "caption":req.body.Caption,
                "date": new Date()
            });
            dummyPost.save((err)=>{
                if(err){
                console.log(err);
                console.log("in post");
                }
            });
            user.Post.Posts.push(dummyPost);
            user.Post.total++;
            user.save((err)=>{
            if (err){
                console.log(err);
                console.log("in user");
            }
        });
            
            res.status(200).json({message:"Posted successfully"});            
        }
        else{
            console.log(err);
        }
    })
})


router.get("/checking",(req,res)=>{
    User.findOne({username:"lakshu_123"}).populate('Post.Posts').
    exec((err,user)=>{
        console.log(user.Post.Posts);
    })
})
router.post("/getprofile",(req,res)=>{
    User.findOne({username:req.body.username}).
    populate('Post.Posts').
    exec((err,user)=>{
        if(err) console.log(err);
        else
        res.status(200).json({user:user});
    })
})
module.exports=router;