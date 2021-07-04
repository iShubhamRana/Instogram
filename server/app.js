const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const port = process.env.PORT || 3001;
const passport=require("passport");
const session=require("express-session");   
const FacebookStrategy = require('passport-facebook').Strategy;
const findOrCreate = require("mongoose-findorcreate");
const app= express();

require('dotenv').config();

//uses
app.use(session({
  secret: "our little secret",
  resave: false,
  saveUninitialized: false,
  
}));
app.use(passport.initialize());   
app.use(passport.session());
app.use(express.static(__dirname+"/public"));
app.use(express.json({limit: '50mb'}));
app.use(cors());
app.use(require(__dirname +"/router/auth.js"));
app.use(require(__dirname +"/router/posts-comment.js"));


const User=require("./model/userSchema");
passport.use(User.createStrategy());


  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({'facebook_id':profile.id},(err,user)=>{
      if (err) {
        return done(err);
    }
    //No user was found... so create a new user with values from Facebook (all the profile. stuff)
    if (!user) {
        user = new User({
            name: profile.displayName,
            username: profile.displayName+profile.id,
            facebook_id:profile.id,
            provider: 'facebook',
            //now in the future searching on User.findOne({'facebook.id': profile.id } will match because of this next line
            facebook: profile._json
        });
        user.save(function(err) {
            if (err) console.log(err);
            return done(err, user);
        });
    } else {
        //found user. Return
        return done(err, user);
    }
    })
  }
));
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
mongoose.connect(process.env.MONGO_URL , {useNewUrlParser:true , useUnifiedTopology:true , useFindAndModify: false },()=>{
    console.log("connect to DB");
});

mongoose.set('useCreateIndex', true);




app.listen(port,()=>{
    console.log("server running successfully on port 3001");
})



