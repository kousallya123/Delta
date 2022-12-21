import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import Post from '../Post/Post'
import Share from '../Share/Share'
import './Feed.css'
import {io} from 'socket.io-client'
import Navbar from '../Navbar.js/Navbar'

function Feed() {
   const user = useSelector((state)=> state.user)
   const [posts,setPosts]=useState([])
   const [socket,setSocket]=useState(null)
   const axiosInstance=axios.create({
    baseURL:process.env.REACT_APP_API_URL,
   })
  
  useEffect(()=>{
    setSocket(io('http://localhost:2002'))
  },[])

  useEffect(()=>{
    socket?.emit("addUser",user._id)
  },[socket,user])

   useEffect (()=>{
      const fetchPost=async()=>{
        const res=await axiosInstance.get(`post/timeline/${user._id}`,
        {headers:{"x-access-token":localStorage.getItem('usertoken')}})
        setPosts(
          res.data.sort((p1,p2)=>{
          return new Date(p2.createdAt)-new Date(p1.createdAt)
        })
       )
      }
      fetchPost()
   },[posts])


  return (
    <>
    <div>
    <Navbar socket={socket}/>
    </div>
    <div className='feed'>
      <div className='feedWrapper'>
        <Share/>
        {posts.length===0?
        <>
        <h1 className=' text-center text-3xl text-gray-500 p-5'>No feeds to shown</h1>
        <img src="/assets/noPostImg.png" className='justify-center snap-center ml-60'></img>
        </>:
         <div>
         {posts.map((p)=>(
             <Post key={p.id} post={p} socket={socket}/>
        ))}
         </div>
        
        }
       
      </div>
    </div>
    </>
  )
}

export default Feed
