const mongoose=require("mongoose");

const commentSchema=mongoose.Schema({
    User:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    text:{type: String , required:true},
    Post:{type:mongoose.Schema.Types.ObjectId, ref: 'Post'},
    date:Date
});

const Comment = new mongoose.model('Comment',commentSchema);

module.exports=Comment;