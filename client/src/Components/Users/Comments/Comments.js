import React from 'react'
import {BookmarkBorder, MoreVert,Send,FavoriteBorder,Comment, FavoriteOutlined} from '@mui/icons-material'
import {format}  from 'timeago.js'
import { useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import './Comments.css'

function Comments({post}) {
    console.log(post,'qqqqqqqqqqqqqqqqqqqqqqqqqqq');
    const [comment,setComment]=useState('')
    const [seeComments,setSeeComments]=useState([])
    const [commentShow,setCommentShow]=useState(false)
    const currentUser= useSelector((state)=>state.user)
 
    const handleComment=async(e)=>{
        console.log(currentUser._id);
        console.log(post._id);
         e.preventDefault()
         const res=await axios.post(`http://localhost:5000/post/addcomment/${post._id}`,{userId:currentUser._id,comment:comment,postId:post._id})
         if(res.data){
          window.location.reload()
         }
      }
    
      const postComments=async()=>{
        console.log('see commentsssss');
        const comments= await axios.get(`http://localhost:5000/post/getcomments/${post._id}`)
        setSeeComments(comments.data);
        setCommentShow(!commentShow) 
      }

  return (
    <div>
        <form className="flex items-center p-4" onSubmit={handleComment}>
           <SentimentSatisfiedAltIcon className="h-7 mr-2" />
             <input
              type="text" value={comment} onChange={(e)=>setComment(e.target.value)}
              className="border-none flex-1 focus:ring-0 outline-none"placeholder="Add a comment..." />
             <button type="submit" className="font-semibold text-blue-400" >Post</button>
          </form>
            <p onClick={postComments}>see comments</p>
          {
            seeComments.map((obj)=>{

             return(
                <>
                {commentShow?
                <div className='commentSection'>
                <div className='commentLeft'>
                   <p>{obj.comment}&nbsp;</p> 
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
