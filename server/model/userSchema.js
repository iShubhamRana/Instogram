const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");
const passportLocalMongoose=require("passport-local-mongoose");
const userSchema=mongoose.Schema({
    name:String,
    email:String,
    username:String,
    password:String,
    facebook_id:String
});

userSchema.plugin(findOrCreate);
userSchema.plugin(passportLocalMongoose);
const User = new mongoose.model('User',userSchema);

module.exports=User;