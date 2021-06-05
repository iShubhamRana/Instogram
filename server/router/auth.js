const express=require("express");
const router=express.Router();
const passport=require("passport");
const User=require("../model/userSchema");
const passportLocalMongoose=require("passport-local-mongoose");
const passportLocal=require("passport-local");

router.post("/signup",(req,res)=>{
  
    User.findOne({email:req.body.email},(err,user)=>{
        if(user){
         return res.status(402).json({error:"Email already exists"});
        }
    })

    User.register({ email:req.body.email,name:req.body.name,username: req.body.username }, req.body.password , (err,user)=>{
        if(err){            
            res.status(402).json({error:err.message});
        }
        else {
        passport.authenticate("local")(req,res,()=>{
            res.status(200).json({message:"user registered successfully"});
        })
       }
    })

});

router.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    res.status(200).json({message:"Logged in successfully!!"})
  });
   

router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback', function(req,res,next){
  passport.authenticate('facebook',(err,user)=>{
    if(err){
     res.status(402).json({error:err.message});
    }
    else
     res.status(200).json({message:"Logged in successfully! change the default username if you are logging in fot the first time"})
    
  })(req,res,next);});
module.exports=router;