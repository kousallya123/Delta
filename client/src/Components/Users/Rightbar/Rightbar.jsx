import { useState } from 'react'
import { useEffect } from 'react'
import  './Rightbar.css'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'


function Rightbar() {
  const [users,setUsers]=useState([])
  const user = useSelector((state)=> state.user)
  const [check,setCheck]=useState(false)


  useEffect(()=>{
    console.log('button changed');
  },[check])



  useEffect(()=>{
    const fetchUsers=async()=>{
     const allUsers=await axios.get(`/admin/users`)
     if(allUsers){
      setUsers(allUsers.data)
     }else{
      console.log('error');
     }
    }
    fetchUsers()
  },[check])
  const FollowUser = async(id) => {
    console.log('followed user');
    try {
      const res= await axios.put(`http://localhost:5000/follow/${id}`,{ userId:user._id });
      console.log(res);
      setCheck(!check)
    } catch (err) {
    console.log(err)
  }
}
  const UnFollowUser = async(id) => {
    console.log('unfollowed user');
    try {
      const res= await axios.put(`http://localhost:5000/unfollow/${id} `,{ userId:user._id });
      console.log(res);
      setCheck(!check)
    } catch (err) {
      console.log(err)
    }
    
  }
  return (
    <div className='rightbar'>
          <div class="sidebar">
  <div class="sidebar-menu-container">
    {/* <div class="sidebar-card sidebar-header grid">
      <img  src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" class="sidebar-img sidebar-hd-img"/>
      <span class="sidebar-title card-title">
        Lorem, ipsum.
      </span>
      <span class="card-subtitle sidebar-subtitle">Lorem.</span>
      <span class="sidebar-btn">
        Change
      </span>
    </div> */}
    <div class="suggestions-header grid">
      <span class="suggestions-text">
        Suggestions for you
      </span>
      <span class="sidebar-btn-alt">
        {/* See all */}
      </span>
    </div>
    {users.map((obj)=>{
     return(
     <div class="side bar-card sidebar-card-alt grid">
      <img style={{height:"40px",width:"40px"}} src="/assets/avatar.jpg" alt="" class="sidebar-img side-bar-img-alt"/>
      <span class="sidebar-title card-title">
      {obj.username}
      </span>
      <span class="sidebar-btn">
               {obj.followers.includes(user._id) ?<button className='followButton' onClick={(e) => { UnFollowUser(obj._id) }}>Unfollow</button>:
               <button className='followButton' onClick={(e) => { FollowUser(obj._id) }}>Follow</button>
              }
      </span>
    </div>
      )
    })}
    </div>
    </div>
            <div className='friendsDetails'>
              <h3></h3>
             
              <br/>
              </div>
           
         
    </div>
  )
}

export default Rightbar
