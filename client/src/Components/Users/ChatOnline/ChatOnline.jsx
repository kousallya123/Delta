import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import  './ChatOnline.css'

function ChatOnline({onlineUsers,currentId,setCurrentChat}) {
  // console.log(onlineUsers,'0000000000000',currentId,'11111111111111111',setCurrentChat,'2222222222222222222');
  const [friends,setFriends]=useState([])
  const [onlineFriends,setOnlinFriends]=useState([])

  useEffect(()=>{
    const getFriends=async()=>{
      const res=await axios.get('http://localhost:5000/chat/friendlist/'+currentId)
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
  // console.log(onlineFriends,'vvvvvvvvvvvvvvvvvvvvvvv');
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
          <span className="chatOnlineName">{o.username}</span>
        </div>
        
      ))}
       
    </div>
  )
}

export default ChatOnline
