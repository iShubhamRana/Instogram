const express=require("express");
const router=express.Router();
const passport=require("passport");
const User=require("../model/userSchema");
const passportLocalMongoose=require("passport-local-mongoose");
const passportLocal=require("passport-local");

//for signup post request

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
          // req.login();
            res.status(200).json({message:"user registered successfully",user:req.user});
        })
       }
    })

});


//for login post request
router.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    // req.login();
    res.status(200).json({message:"Logged in successfully!!",user:req.user})
  });
   
//routes for fb authentication
router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback', passport.authenticate('facebook'), function(req,res){
  res.redirect("http://localhost:3000/");
});

//for authentication and this will return the user data

router.get('/authenticate',(req,res)=>{
  if (req.isAuthenticated()){
    res.status(200).json({message:" user authenticated",user:req.user});
  }
  else{
    res.status(401).json({error:"user unauthorized"})
  }
  
})




module.exports=router;