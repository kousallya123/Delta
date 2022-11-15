import { useState } from 'react'
import { useEffect } from 'react'
import  './Rightbar.css'
import axios from 'axios'
import { useSelector } from 'react-redux'


function Rightbar() {
  const [users,setUsers]=useState([])
  const user = useSelector((state)=> state.user)
  const [isfollowed,setIsFollowed]=useState(false)

  useEffect(() => {
    setIsFollowed(user.followings.includes(users._id));
  }, [users._id]);

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
  },[])
  const FollowUser = async(id) => {
    console.log('followed user');
    try {
      const res= await axios.put(`http://localhost:5000/follow/${id} `,{ userId:user._id });
      console.log(res);
    } catch (err) {}
    setIsFollowed(!isfollowed);
  };
  const UnFollowUser = async(id) => {
    console.log('unfollowed user');
    try {
      const res= await axios.put(`http://localhost:5000/unfollow/${id} `,{ userId:user._id });
      console.log(res);
    } catch (err) {}
    setIsFollowed(!isfollowed);
  };



  return (
    <div className='rightbar'>
       {users.map((obj)=>{
           return(
            <div className='friendsDetails'>
              <h3>{obj.username}</h3>
              {isfollowed? <button className='followButton' onClick={(e) => { FollowUser(obj._id) }}>Follow</button>:
               <button className='followButton' onClick={(e) => { UnFollowUser(obj._id) }}>Unfollow</button>
              }
            
             
              <br/>
              </div>
           
           )
       })}
    </div>
  )
}

export default Rightbar
