const Users=require('../models/userModel')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const userModel = require('../models/userModel')
const { isObjectIdOrHexString } = require('mongoose')

    const authCtrlRegister=async(req,res)=>{
        try {
            const {fullname,username,email,password,gender}=req.body
            let newUserName=username.toLowerCase()


            const user_name=await Users.findOne({username:newUserName})
            if(user_name) return res.json({msg:'This usrename is already is already exists'}) 
            
            const user_email=await Users.findOne({email})
            if(user_email) return res.json({msg:'This email is already is already exists'})  

            
           if(password.length<6) return res.json({msg:'Password must be atleast 6 characters'})  


           const passwordHash=await bcrypt.hash(password,10)
           
          const newUser=new userModel({
            fullname,username:newUserName,email,password:passwordHash
          })

          const access_token=createAccessToken({id:newUser._id})
          const refresh_token=createRefreshToken({id:newUser._id})
          
          res.cookie('refreshtoken',refresh_token,{
            httpOnly:true,
            path:'/refresh_token',
            maxAge:240000
          })

          await newUser.save()

           res.json({
            msg:'register success',
            access_token,
            user:{
               ...newUser._doc,
               password:''
            }  
        })

        } catch (error) {
            return res.json({msg:error.message})
        }
    }
    
    const authCtrlLogin=async(req,res)=>{
        try {
         const {email,password}=req.body

         const user=await userModel.findOne({email})
                
         if(!user) return res.json({msg:'Could not find the user'})
         
         const isMatch=await bcrypt.compare(password,user.password)
         if(!isMatch) return res.json({msg:"Password is incorrect"})
         
         if(user.status==="inactive") return res.json({msg:"User is blocked"})
         
         const access_token=createAccessToken({id:user._id})
         const refresh_token=createRefreshToken({id:user._id})
         
         res.cookie('refreshtoken',refresh_token,{
           httpOnly:true,
           path:'/refresh_token',
           maxAge:240000
         })


          res.json({
           msg:'Login success',
           access_token,
           user:{
              ...user._doc,
              password:''
           }})

        } catch (error) {
            return res.json({msg:error.message})
        }
    }
    const authCtrlLogout=async(req,res)=>{
        try {
           res.clearCookie('refreshtoken',{path:'/refresh_token'})
           return res.json({msg:"Logged out"})
             
        } catch (error) {
            return res.staus(500).json({msg:error.message})
        }
    }
    const authCtrlGetAccessToken=async(req,res)=>{
        try {
            const rf_token=req.cookies.refresh_token
            if(!rf_token) return res.json({msg:"Please login"})
            
                jwt.verify(rf_token,process.env.REFRESH_TOKEN_SECRET,async(err,result)=>{
                console.log(result);
                if(err) return res.json({msg:"Please loginuhisiu"})
                const user=await userModel.findById(result.id).select("-password")
                .populate('followers following','-password')
                
                if(!user) return res.json({msg:"User does not exist"})

                const access_token=createAccessToken({id:result.id})

                res.json({
                    access_token,
                    user
                })
            })
        } catch (error) {
            return res.staus(500).json({msg:error.message})
        }
    }



   const createAccessToken=(payload)=>{
      return jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1d'})
    } 

   const createRefreshToken=(payload)=>{
        return jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET,{expiresIn:'30d'})
   }

   const updateUser=async(req,res)=>{
      if(req.body.userId===req.params.id||req.body.isAdmin){
        if(req.body.password){
            try {
                const salt=await bcrypt.genSalt(10)
                req.body.password=await bcrypt.hash(req.body.password,salt)
            } catch (error) {
                return res.json(error)
            }
        }
        try{
            const user=await Users.findByIdAndUpdate(req.params.id,{
                $set:req.body,
            })
            res.json("Account has been updated")
        }catch(error){
            return res.json(error)
        }
      }else{
        res.json("You can only update your details!")
      }
   }


   const deleteUser=async(req,res)=>{
    if(req.body.userId===req.params.id||req.body.isAdmin){
      try{
          await Users.findByIdAndDelete(req.params.id)
          res.json("Account has been deleted")
      }catch(error){
          return res.json(error)
      }
    }else{
      res.json("You can only delete your details!")
    }
}

const getUser=async(req,res)=>{
   try {
      const user=await Users.findById(req.params.id)
      if(user){
        res.json(user)
      }
     
   } catch (error) {
      res.json(error)
   }
}

const followUser=async(req,res)=>{
    if(req.body.userId!==req.params.id){
       try {
         const user=await Users.findById(req.params.id)
         const currentUser=await Users.findById(req.body.userId)
         if(!user.followers.includes(req.body.userId)){
           await user.updateOne({$push:{followers:req.body.userId}})
           await currentUser.updateOne({$push:{followings:req.params.id}})
           res.json("User has been followed")
         }else{
            res.json('You already followed')
         }

       } catch (error) {
         res.json(error)
       }
    }else{
     res.json("You can't follow yourself")
    }
 }
 

 const unFollowUser=async(req,res)=>{
    if(req.body.userId!==req.params.id){
       try {
         const user=await Users.findById(req.params.id)
         const currentUser=await Users.findById(req.body.userId)
         if(user.followers.includes(req.body.userId)){
           await user.updateOne({$pull:{followers:req.body.userId}})
           await currentUser.updateOne({$pull:{followings:req.params.id}})
           res.json("User has been unfollowed")
         }else{
            res.json('You are not following this user')
         }

       } catch (error) {
         res.json(error)
       }
    }else{
     res.json("You can't unfollow yourself")
    }
 }
 

module.exports={authCtrlRegister,authCtrlLogin,authCtrlLogout,authCtrlGetAccessToken,updateUser,deleteUser,getUser,unFollowUser,followUser}    