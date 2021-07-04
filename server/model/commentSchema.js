const mongoose=require("mongoose");
const passportLocalMongoose=require("passport-local-mongoose");
const commentSchema=mongoose.Schema({
    User:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    text:{type: String },
    Post:{type:mongoose.Schema.Types.ObjectId, ref: 'Post'},
    date:Date
});
commentSchema.plugin(passportLocalMongoose);
const Comment = new mongoose.model('Comment',commentSchema);

module.exports=Comment;