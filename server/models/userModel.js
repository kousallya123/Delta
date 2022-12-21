const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
  username:{
    type:String,
    required:true,
    trim:true,
    maxlength:25,
    unique:true
 },
 email:{
    type:String,
    required:true,
    trim:true,
    unique:true
 },
 password:{
    type:String,
    required:true
 },
 profilePicture:{
    type:String,
    default:"avatar.jpg"
 },
 coverPicture:{
   type:String
},
date:{
   type:Date,
   default:Date.now()

},
status:{
   type:String,
   default:"active"            

},
desc:{type:String,max:50 },
followers:{
   type:Array,
   default:[]
},
followings:{
   type:Array,
   default:[]
},
isAdmin:{
   type:Boolean,
   default:false,
},
token:{
   type:String,
},
},{
   timestamps:true 
})


module.exports=mongoose.model('user',userSchema)