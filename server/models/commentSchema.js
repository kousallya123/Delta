const mongoose=require('mongoose')

const CommentSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },
    postId:{
        type:String,
        required:true
    },
    comment:{
        type:String,
        max:500
    },
    likes:{
        type:Array,
        default:[]
    }
    },{
        timestamps:true 
    })

module.exports=mongoose.model("comment",CommentSchema)