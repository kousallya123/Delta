import axios from 'axios'
import { useEffect, useState } from 'react'
import NotFound from '../../NotFound'
import  './Conversation.css'

function Conversation({conversation,currentUser}) {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER
  const [user,setUser]=useState(null) 
  const [error,setError]=useState('')
   useEffect(()=>{
       const friendId=conversation.members.find((m)=>m!==currentUser._id)
       const getUser=async()=>{
        try {
            const res=await axios.get(`/users?userId=${friendId}`,
            {headers:{"x-access-token":localStorage.getItem('usertoken')}})
            setUser(res.data)  
        } catch (error) {
           console.log(error);  
           setError(error)
        }
      }
      getUser()

    },[currentUser._id,conversation])
    
  return (
    <>
    <div className='conversation hidden md:flex'>
        <img className='conversationImage'src={PF+user?.profilePicture} alt=''/>
        <span className='convarsationName hidden md:block'>{user?.username}</span>
    </div>
   
    </>
  )
}

export default Conversation
