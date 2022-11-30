const mongoose=require('mongoose')

const postSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        max:500
    },
    img:{
        type:String
    },
    video:{
        type:String
    },
    likes:{
        type:Array,
        default:[]
    },
    reports:{
        type:Array,
        default:[]
    },
    reportedStatus:{
        type:String,
        default:'false'
    }
    },{
        timestamps:true 
    })

module.exports=mongoose.model("post",postSchema)
