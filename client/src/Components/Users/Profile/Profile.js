import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './Profile.css'
import axios from 'axios'
import Post from '../Post/Post'
import { useParams } from 'react-router-dom'
import Navbar from '../Navbar.js/Navbar'

function Profile() {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState('');
  const username = useParams().username;
  const users = useSelector((state)=> state.user)
  const [posts,setPosts]=useState([])
  
  useEffect (()=>{
     const fetchPost=async()=>{
       const res=await axios.get(`http://localhost:5000/post/userpost/${user._id}`)
       setPosts(
         res.data)
     }
     fetchPost()
  },[])
  console.log(posts,'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  return (
    <>
      {/* <Navbar /> */}
      <div className="profile">
        {/* <Sidebar /> */}
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : "/assets/cover1.jpg"
                }
                alt=""
              />
              <img
                className="profileUserImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : "/assets/avatar.jpg"
                }
                alt=""
              />
            </div>
            <div className='followDetails'>
            <div className='followDetails1'>
              {/* <h2>{user.followings.length}</h2> */}
              <h2>Followings</h2>

            </div>
            <div className='followDetails2'>
             {/* <h2>{obj.followers.length}</h2> */}
              <h3>Followers</h3>
            </div>
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.email}</span><br/>
            </div>
            <div className='profileButtons'>
              {users.username===username?<button className='profileFollowButton'>Edit profile</button>:
              <button className='profileFollowButton'>Follow</button>
              }
              
            </div>
            <div className='postinProfile'>
            {posts.map((posts)=>(
             <Post key={posts.id} post={posts}/>
             ))}
            </div>
           
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile
