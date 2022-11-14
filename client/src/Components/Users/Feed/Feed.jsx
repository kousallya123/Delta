import axios from 'axios'
import { useContext, useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../features/userReducer'
import Post from '../Post/Post'
import Share from '../Share/Share'
import './Feed.css'

function Feed() {
  const user=useSelector(selectUser)
   const [posts,setPosts]=useState([])
   useEffect (()=>{
      const fetchPost=async()=>{
        const res=await axios.get(`http://localhost:5000/post/timeline/${user.user._id}`)
        setPosts(
          res.data.sort((p1,p2)=>{
          return new Date(p2.createdAt)-new Date(p1.createdAt)
        })
       )
      }
      fetchPost()
   },[])



  return (
    <div className='feed'>
      <div className='feedWrapper'>
        <Share/>
        {posts.map((p)=>(
             <Post key={p.id} post={p}/>
        ))}
       
      </div>
    </div>
  )
}

export default Feed
