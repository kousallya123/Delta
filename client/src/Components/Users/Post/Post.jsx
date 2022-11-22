import  './Post.css'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ShareIcon from '@mui/icons-material/Share';
import SendIcon from '@mui/icons-material/Send';
import {BookmarkBorder, MoreVert,Send,FavoriteBorder,Comment, FavoriteOutlined, DeleteOutline} from '@mui/icons-material'
import {format}  from 'timeago.js'
import {useState,useEffect, useContext} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
import Comments from '../Comments/Comments';



function Post({post}) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const currentUser= useSelector((state)=>state.user)


  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);
  const likeHandler = () => {
    try {
      axios.put(`/post/like/${post._id} `,{ userId: currentUser._id });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };


  const deletePost=async()=>{
    const res= await axios.delete(`http://localhost:5000/post/${post._id}`,{ userId: currentUser._id })
    alert('post deleted successfully')
    window.location.reload()
  }

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    :  "/assets/avatar1.jpg"
                }
                alt=""
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <DeleteOutline  onClick={deletePost}/>
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PF + post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
          <div className='text-2xl text-slate-900' onClick={likeHandler}>{isLiked? <FavoriteOutlined style={{color:"#ed4956"}}/>:<FavoriteBorder/>}</div>
            &nbsp;&nbsp;<ChatBubbleIcon />
            &nbsp;&nbsp;<ShareIcon/>
            &nbsp;&nbsp;
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
        <div>
        <Comments post={post} />
            </div>
           </div>
         </div>
      );
}

export default Post