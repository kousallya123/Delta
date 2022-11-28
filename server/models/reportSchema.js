const mongoose=require('mongoose')

const ReportSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"post"
    },
    Content:{
        type:String,
        max:500
    }
    },{
        timestamps:true 
    })

module.exports=mongoose.model("report",ReportSchema)