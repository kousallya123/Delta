import React, { useEffect } from 'react'
import {BookmarkBorder, MoreVert,Send,FavoriteBorder,Comment, FavoriteOutlined} from '@mui/icons-material'
import {format}  from 'timeago.js'
import { useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import './Comments.css'

function Comments({post,socket}) {
    const [comment,setComment]=useState('')
    const [seeComments,setSeeComments]=useState([])
    const [commentShow,setCommentShow]=useState(false)
    const currentUser= useSelector((state)=>state.user)
    const [user,setUser]=useState('')
    const PF=process.env.REACT_APP_PUBLIC_FOLDER
    const handleComment=async(e)=>{
         e.preventDefault()
         await axios.post(`http://localhost:5000/post/addcomment/${post._id}`,
         {userId:currentUser._id,comment:comment,postId:post._id})
         console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaa');
         setComment("")
      }

      useEffect(() => {
        const fetchUser = async () => {
          const res = await axios.get(`/users?userId=${post.userId}`,
          {headers:{"x-access-token":localStorage.getItem('usertoken')}});
          setUser(res.data);
        };
        fetchUser();
      }, [post.userId]);
    
      useEffect(()=>{
        const postComments=async()=>{
          const comments= await axios.get(`http://localhost:5000/post/getcomments/${post._id}` ,
          {headers:{"x-access-token":localStorage.getItem('usertoken')}},)
            setSeeComments(comments.data);
          }
          postComments()
      },[comment])
      
      const handleShow=()=>{
        setCommentShow(!commentShow)
      }
      const handleNotification=async(type)=>{
        const notification=await axios.post(`http://localhost:5000/notification`,{
          senderId:currentUser._id,
          receiverId:user._id,
          type, 
        })
        socket.emit("sendNotification",{
          senderId:currentUser._id,
          receiverId:user._id,
          type,
        })
      }
    


  return (
    <div>
        <form className="flex items-center py-2" onSubmit={handleComment}>
           <SentimentSatisfiedAltIcon className="h-7 mr-2" />
             <input
              type="text" value={comment} onChange={(e)=>setComment(e.target.value)}
              className="border-none flex-1 focus:ring-0 outline-none"placeholder="Add a comment..." />
             <button type="submit" className="font-semibold text-blue-400"  onClick={()=>handleNotification(2)}>Post</button>
          </form>
            <p onClick={handleShow} className='cursor-pointer'>see comments</p>
          {
            seeComments.map((obj)=>{

             return(
                <>
                {commentShow?
                <div className='commentSection'>
                <div className='commentLeft'>
                  <img src={PF+obj.userId.profilePicture} className='w-8 h-8 mt-1 rounded-full'/> 
                 {obj.userId.username===currentUser.username?   <p className='font-semibold px-2 mt-1'>You</p>:
                  <p className='font-semibold px-2 mt-1'>{obj.userId.username}</p> }
                  
                   <p className='mt-1'>{obj.comment}&nbsp;</p> 
                   <p className='commentDate'>{format(obj.createdAt)}</p>
                </div>   
                </div>:null}
                </>
               )
            })
          } 
    </div>
  )
}

export default Comments
