const express=require("express");
const User=require("../model/userSchema");
const POST=require("../model/postSchema");
const Comment=require("../model/commentSchema");
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
                return  res.status(402).json({error:"An error occurred"});
                }
            });
            user.Post.Posts.push(dummyPost);
            user.Post.total++;
            user.save((err)=>{
            if (err){
            return    res.status(402).json({error:"An error occurred"});
            }
        });
            
            res.status(200).json({message:"Posted successfully"});            
        }
        else{
            console.log(err);
        }
    })
})



router.post("/getprofile",(req,res)=>{
    User.findOne({username:req.body.username}).
    populate('Post.Posts').
    exec((err,user)=>{
        if(err) return res.status(402).json({error:"An error occurred"});
        if(!user) return res.status(402).json({error:"No such user"});
        else
        res.status(200).json({user:user});
    })
})


router.post("/updateProfile",(req,res)=>{
    const {id,name,email,username,bio,profile_pic}=req.body;
    if(!name || !email || !username || !bio || !profile_pic)
    return res.status(402).json({error:"an error occurred"});

    //to check username
    User.findOne({username:username},(err,user)=>{
        if(err)
        console.log(err);
        User.findOneAndUpdate({_id:id},{$set:{
            name:name,
            email:email,
            bio:bio,
            profile_pic:profile_pic,
            username:username
        }} , (err,user)=>{
            if (err){
                return res.status(402).json({error:"An error occurred"});
            }
            else
            return res.status(200).json({message:"Congrats! Profile updated", user:user});
        })
    })

    
    
})

router.post("/changePassword",(req,res)=>{
    const {id,oldPassword,newPassword}=req.body;
    User.findOne({_id:id},(err,user)=>{
        if (err)
        return res.status(402).json({error:"An error occurred"});
        else{
            user.changePassword(oldPassword,newPassword,(err)=>{
             if (err){
                if(err.name==="IncorrectPasswordError"){
                 return res.status(402).json({error:"Incorrect Password"});
                }
                else
                return res.status(402).json({error:"An error occurred"});
            }
            else {
                res.status(200).json({message:"Congrats! Your password has been changed successfully"})
            }

            })
        }
    })
})

router.post("/newFollow",(req,res)=>{
  const {follower,followed}=req.body;

  //add follower to the followed user
  User.findOne({_id:followed._id},(err,user)=>{
        if(err)
        return res.status(402).json({error:"An error occurred"});
        else{
            
            user.followers.by.push(follower);
            user.followers.total++;
        }
        user.save();
  })

//add following to the user
  User.findOne({_id:follower._id},(err,user)=>{
      if(err)
      return res.status(402).json({error:"An error occurred"});
      else{
          user.following.by.push(followed);
          user.following.total++;
          user.save();
      }

  })
  return res.status(200).json({message:"Followed successfully"});
})

router.post("/unfollow",(req,res)=>{
    const {followed,follower}=req.body;

    User.findOne({_id:followed._id},(err,user)=>{
        if(err)
        return res.status(402).json({error:"An error occurred"});
        else{
            user.followers.by= user.followers.by.filter((element)=>{
                if (element!=follower._id) 
                return element;
            })
            user.followers.total--;
        }
        user.save();
  })


  User.findOne({_id:follower._id},(err,user)=>{
    if(err)
    return res.status(402).json({error:"An error occurred"});
    else{
        user.following.by=user.following.by.filter((element)=>{
            if(element!=followed._id)
            return element;
        })
        user.following.total--;
        user.save();
    }

})
return res.status(200).json({message:"Unfollowed successfully"});
})


router.post("/getFollowers",(req,res)=>{
    User.findOne({username:req.body.username}).
    populate('followers.by',['username','profile_pic','name'])
    .exec((err,user)=>{
       if(err)
       return res.status(402).json({error:"An error occurred"});
       else
       return res.status(200).json({followers:user.followers.by});

    })
})

router.post("/getFollowing",(req,res)=>{
    User.findOne({username:req.body.username}).
    populate('following.by',['username','profile_pic','name'])
    .exec((err,user)=>{
       if(err)
       return res.status(402).json({error:"An error occurred"});
       else
       return res.status(200).json({following:user.following.by});

    })
})

router.post("/getPost",(req,res)=>{
    POST.findOne({_id:req.body.postId}).
    populate('User',['username','profile_pic','name']).
    populate('likes.by',['username','name','profile_pic']).
    populate({
        path:'comments.by',
        populate: { path: 'User' }
    }).
    exec((err,post)=>{
        if(err){
            console.log(err);
        return res.status(402).json({error:"An error occurred"});
        }
        else
        return res.status(200).json({post:post});
    })
})

router.post("/likepost",(req,res)=>{
    const {postId,by}=req.body;
    POST.findOne({_id:postId},(err,post)=>{
        post.likes.by.push(by);
        post.likes.total++;
        post.save()
    })
    res.status(200).json({message:"done"});
})

router.post("/unlikepost",(req,res)=>{
    const {postId,by}=req.body;
    POST.findOne({_id:postId},(err,post)=>{
        post.likes.by=post.likes.by.filter((user)=>{
            if(user._id !=by) return user;
        })
        post.likes.total--;
        post.save()
    })
    res.status(200).json({message:"done"});
})

router.post("/addComment",(req,res)=>{
    const {postId,text,userId}=req.body;
    POST.findOne({_id:postId},(err,post)=>{
        if(err) 
        return res.status(402).json({error:"An error occurred"});
        else{
            const dummyComment=new Comment({
                "User":userId,
                "text":text,
                "Post":postId,
                date: new Date()
            })
        

        dummyComment.save();
        post.comments.by.push(dummyComment);
        post.comments.total++;
        post.save();
        }
    })
    return res.status(200).json({message:"done"});
})



router.post("/getfeedpost",(req,res)=>{
   const {user}=req.body;
   

   User.findOne({_id:user}).
   populate('Post.Posts').
   exec((err,User)=>{
    if(err) console.log(err);
    else{
        const random=Math.floor((Math.random() * User.Post.Posts.length - 1) + 1);
        return res.status(200).json({
            post:User.Post.Posts[random],
            postAuthor:User.username,
            profile_pic:User.profile_pic
        })
    }
    
   })
})

router.post("/findUsers",(req,res)=>{
    const {search}=req.body;
    const regex= new RegExp(search,'i');
    User.find({username:{$regex:regex}},(err,users)=>{
        if(err) return res.status(402).json({error:"No usch user"});
        else{
            return res.status(200).json({users:users});
        }
    })
})
module.exports=router;