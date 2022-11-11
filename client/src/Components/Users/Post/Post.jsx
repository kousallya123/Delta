import  './Post.css'
import {BookmarkBorder, MoreVert,Send,FavoriteBorder,Comment} from '@mui/icons-material'
import {Users} from '../../../dummyData'
import {useState} from 'react'

function Post({post}) {
    const [like,setLike]=useState(post.like)
    const [isliked,seIstLiked]=useState(false)
    const likeHandler=()=>{
        setLike(isliked ? like-1 :like+1)
        seIstLiked(!isliked)
    }
  return (
    <div className='post'>
        <div children="postWrapper">
        <div className='postTop'>
            <div className="postTopLeft">
                <img className='postProfileImg' src={Users.filter((u)=>u.id===post.userId)[0].profilePicture} alt=""/>
                <span className="postUsername">{Users.filter((u)=>u.id===post.userId)[0].username}</span>
                <span className="postDate">{post.date}</span>
            </div>
            <div className="postTopRight">
            </div>
        </div>
        <div className='postCenter'>
            <span className="postText">{post?.desc}</span>
            <img className="postImg"src={post.photo} alt=''/>
        </div>
        <div className='w-full h-16  border-slate-300 '>
          <div className='w-full  flex justify-between  h-3/5 items-center '>
            <div className='w-28 bg-white flex justify-between items-center space-x-2 p-1'>
              <div className='text-2xl text-slate-900'><FavoriteBorder/> </div>
              <div className='text-xl'><Comment/> </div>
              <div className='text-xl'><Send /> </div>

            </div>
            <div className='text-xl p-1 '><BookmarkBorder /> </div>
          </div>

          <div className='w-full  h-2/5 text-xs flex justify-start p-2'>
            Liked_by: britto and 243 others
          </div>

        </div>
        </div>
    </div>
  )
}

export default Post
