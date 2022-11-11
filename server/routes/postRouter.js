const express=require('express')
const router=express.Router()
const Post=require('../models/postSchema')


router.post("/",async(req,res)=>{
  const newPost=new Post(req.body)
  try {
    const savedPost=await newPost.save()
    res.json(savedPost)
    
  } catch (error) {
    res.json(error)
  }
})

router.put('/:id',async(req,res)=>{
    try{
        const post= await Post.findById(req.params.id)
        if(post.userId === req.body.userId){
           await post.updateOne({$set:req.body})
           res.json('post updated successfully')
        }else{
            res.json("you can update only your post")
        }

    }catch(error){
      res.json(error)
    }
   
}) 



router.delete('/:id',async(req,res)=>{
    try{
        const post= await Post.findByIdAndDelete(req.params.id)
        if(post.userId === req.body.userId){
           await post.deleteOne()
           res.json('post deleted successfully')
        }else{
            res.json("you can delete only your post")
        }

    }catch(error){
      res.json(error)
    }
}) 



   router.put('/like/:id',async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id)
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes:req.body.userId}})
            res.json("The post has been liked")

        }else{
            await post.updateOne({$pull:{likes:req.body.userId}}) 
            res.json("The post has been unliked")
        }
    }catch(error){
        res.json(error)
    }
   }) 

   router.get('/:id',async(req,res)=>{
     try {
        const post=await Post.findById(req.params.id)
        res.json(post)
     } catch (error) {
        res.json(error)
     } 

   })


   router.get('/timeline/:userId',async(req,res)=>{
    try {
        const currentUser=await Users.findById(req.params.userId)
        const userPosts=await Users.find({userId:currentUser._Id})
        const friendPosts=await Users.find
        console.log(friendPosts);
        res.json(userPosts.concat(...friendPosts))
    } catch (error) {
        res.json(error)
        
    }
   })


   


module.exports=router