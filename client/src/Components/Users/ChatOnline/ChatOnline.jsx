import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import  './ChatOnline.css'

function ChatOnline({onlineUsers,currentId,setCurrentChat}) {
  const [friends,setFriends]=useState([])
  const [onlineFriends,setOnlinFriends]=useState([])

  useEffect(()=>{
    const getFriends=async()=>{
      const res=await axios.get('/friends'+currentId)
      setFriends(res.data)
    }
    getFriends()
  },[currentId])

  useEffect(()=>{
   setOnlinFriends(friends.filter(f=>onlineUsers.includes(f._id)))
  },[friends,onlineUsers])


  const handleClick=async (user)=>{
    try {
      const res= await axios.get(`/chat/find/${currentId}/${user._id}`)
      setCurrentChat(res.data)
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="chatOnline">
      {onlineFriends?.map((o)=>(
          <div className="chatOnlineFriend" onClick={()=>handleClick(o)}>
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src="/assets/avatar.jpg"
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">Britto Vincent</span>
        </div>
      ))}
       
    </div>
  )
}

export default ChatOnline
