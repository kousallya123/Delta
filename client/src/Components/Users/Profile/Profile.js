import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../features/userReducer'
import './Profile.css'
import axios from 'axios'
import Post from '../Post/Post'

function Profile() {
   const [post,setPost]=useState([])
   const user=useSelector(selectUser)
   const users=user.user
   useEffect(()=>{
    const fetchUserPost=async()=>{
      const userPosts=await axios.get(`http://localhost:5000/post/userpost/${users._id}`)
       console.log(userPosts.data);
       setPost(userPosts.data)
    } 
    fetchUserPost()
   },[])

  return (
    <div className='profileRightTop'>
        <div className="profileCover">
           <img className='profileCoverImage' src="assets/b2.webp" alt=""/>
           <img className='profileUserImage' src="assets/b1.jpg" alt=""/>
           <div className="profileInfo">
            <h4 className='profileInfoName'>{users.username}</h4>
            <p className='profileInfoDesc'>
            </p>
        </div>
        </div>
        <div>
          Followers {users.followers.length}
        </div>
        <div>
          Followings {users.followings.length}
        </div>
        <div>
          mail id {users.email}
        </div>
        userPosts  {post.map((p)=>(
             <Post key={p.id} post={p}/>
        ))}
    </div>
  )
}

export default Profile
