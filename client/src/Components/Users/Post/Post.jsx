import  './Post.css'
import {MoreVert} from '@mui/icons-material'
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
        <div className='postBottom'>
            <div className="postBottomLeft">
                <img className="likeIcon" onClick={likeHandler} src="https://banner2.cleanpng.com/20190807/taz/kisspng-heart-pink-m-design-m-95-5d4aa252aca188.8823914615651723067071.jpg"/>
                <span className="postLikeCounter">{like} people like it</span>
            </div>
            <div className="postBottomRight">
                <span className="postCommentText">{post.comment} comments</span>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Post
