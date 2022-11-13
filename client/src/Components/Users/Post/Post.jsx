import  './Post.css'
import {BookmarkBorder, MoreVert,Send,FavoriteBorder,Comment, FavoriteOutlined} from '@mui/icons-material'
import {format}  from 'timeago.js'
import {useState,useEffect, useContext} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../features/userReducer'

function Post({post}) {
    const users=useSelector(selectUser)
   


    const likeHandler=() =>{
       try {
         const like=async()=>{
          await axios.put(`http://localhost:5000/post/like/${post._id}`,{userId:users.user._id})
         }
         like()
         
       } catch (error) {
        
       }
        setLike(isliked ? like-1 :like+1)
        seIstLiked(!isliked)
    }
    const [like,setLike]=useState(post.likes.length)
    const [isliked,seIstLiked]=useState(false)
    const [user,setUser]=useState({})

    useEffect (()=>{
      const fetchUser=async()=>{
        const res=await axios.get(`http://localhost:5000/${post.userId}`)
        setUser(res.data)
      }
      fetchUser()
   },[post.userId])

   
   useEffect(()=>{
    setLike(post.likes.includes(users.user._id))
    },[users.user._id,post.likes])




  return (
    <div className='post'>
        <div children="postWrapper">
        <div className='postTop'>
            <div className="postTopLeft">
                <Link to='/profile'>
                <img className='postProfileImg' src={user.profilePicture ||"https://res.cloudinary.com/practicaldev/image/fetch/s--zbRnbp3---/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://thepracticaldev.s3.amazonaws.com/i/u1x7n8mbvor1nq6tcbk0.jpg"} alt="" />
                </Link>
                <span className="postUsername">{user.username}</span>
                <span className="postDate">{format(post.createdAt)}</span>
            </div>
            <div className="postTopRight">
            </div>
        </div>
        <div className='postCenter'>
            <span className="postText">{post?.desc}</span>
            <img className="postImg"src={post.img} alt=''/>
        </div>
        <div className='w-full h-16  border-slate-300 '>
          <div className='w-full  flex justify-between  h-3/5 items-center '>
            <div className='w-28 bg-white flex justify-between items-center space-x-2 p-1'>
              <div className='text-2xl text-slate-900' onClick={likeHandler}>{isliked? <FavoriteOutlined style={{color:"#ed4956"}}/>:<FavoriteBorder/>}</div>
              <div className='text-xl'><Comment/> </div>
              <div className='text-xl'><Send /> </div>

            </div>
            <div className='text-xl p-1 '><BookmarkBorder /> </div>
          </div>

          <div className='w-full  h-2/5 text-xs flex justify-start p-2'>
            Liked_by: britto and {like} others
          </div>

        </div>
        </div>
    </div>
  )
}

export default Post
