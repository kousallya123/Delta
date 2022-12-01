import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { logout} from '../../../redux/userSlice';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { MdNotificationsNone ,MdExplore} from "react-icons/md";
import Swal from 'sweetalert2'
import { Favorite, MoreVert } from '@mui/icons-material';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import ShareIcon from '@mui/icons-material/Share';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Navbar({socket}) {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const navigate=useNavigate()
  const [drop,setDrop]=useState(false)
  const dispatch=useDispatch();
  const user = useSelector((state)=> state.user)
  const [notifications,setNotifications]=useState([])
  const [showNotification,setShowNotification]=useState(false)
  const [username,setUsername]=useState('')
  const [userProfilePic,setUserProfilePic]=useState('')

  useEffect(()=>{
    socket?.on("getNotification",data=>{
      setNotifications((prev)=>[...prev,data])
    })
  },[socket])



    const handleLogout=async(e)=>{
      e.preventDefault();
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't logout!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes,logout!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            position: 'top-end',
            text: 'Logout success',
            showConfirmButton: false,
            timer: 1000,
            background:'#9333ea',
            color:'white',
          })
          localStorage.removeItem('user')
          localStorage.removeItem('usertoken')
          dispatch(logout())
          navigate('/')
        }
      })   
    }

    const displayNotifications = ({ senderId, type }) => {
        try {
          const fetchUser=async()=>{
            const response=await axios.get('/findUser/'+senderId,
            {headers:{"x-access-token":localStorage.getItem('usertoken')}})
            const username=response.data.username
            const userProfilePic=response.data.profilePicture
            setUsername(username)
            setUserProfilePic(userProfilePic)
         }
         fetchUser()
        } catch (error) {
          console.log(error)
        } 
      let action;
      if (type === 1) {
        action = "liked your post";
      } else if (type === 2) {
        action = "commented on your post";
      } else {
        action = "viewed your profile";
      }
      return (
        <div class="max-w-2xl mx-auto z-50 m-1 bg-transparent">
        
     <div id="toast-default"
    class="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
    role="alert">
       
     {action==="liked your post"&&
     <div
     class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">
    <Favorite style={{color:"red"}}/>
   </div>
   }
   {action==="commented on your post"&&
     <div
     class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">
    <MarkUnreadChatAltIcon style={{coloe:"blue"}}/>
   </div>}
   {action==="viewed your profile"&&
     <div
     class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-yellow-500 bg-yellow-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">
    <AccountCircleIcon style={{coloe:"yellow"}}/>
   </div>}
   <div> <img className='w-5 h-5 rounded-full' src={PF+userProfilePic}></img></div>
    
    <div class="ml-3 text-sm font-normal">{`${username} ${action}.`}</div>
  </div>
    </div>
        // <span className="notification">{`${senderId} ${action} your post.`}</span>
      );
    };


    const handleRead=()=>{
      setNotifications([])
      setShowNotification(false)
    }
  return (
    <>
    <div className='topbarContainer'>
     <div className="topbarLeft">
      <Link to='/home' style={{textDecoration:"none"}}>
      <span className="logo">Delta</span>
      </Link>
     </div>
     <div className="topbarCenter">
      <div className="searchBar">
       <SearchIcon className='searchIcon'/>
       <input className='searchInput' placeholder='Search for friend, post or video' />
      </div>
     </div>
     <div className="topbarRight">
       <div className='topbarIcons'>
       <Link to='/explore'>
          <div className='topbarIconItem'>
          <MdExplore style={{height:"22px",width:"22px", marginTop:"2px"}}/>
          </div>
        </Link>
        <div className='topbarIconItem'>
        <FavoriteBorderIcon/>
        </div>
        {/* <div className='topbarIconItem'>
        <AddBoxIcon/>
        </div> */}
        <div className='topbarIconItem'>
        <Link to='/chat'>
        <ChatIcon/>
        </Link>
        {/* <span className="topbarIconBadge">2</span> */}
        </div>
        <div className='topbarIconItem'>
        <NotificationsIcon onClick={()=>setShowNotification(!showNotification)}/>
        <span className="topbarIconBadge">{notifications.length}</span>
        </div>
       </div>
       <>
     <div class="flex justify-center">
     <div class="relative inline-block">
     <img src={PF+user.profilePicture} alt="" className="topbarImg" onClick={()=>setDrop(!drop)}/>

        {/* <button class="relative z-10 flex items-center p-2 text-sm text-gray-600 bg-white border border-transparent rounded-md focus:border-blue-100 focus:border-radious-20 ">
            <span class="mx-1"><MoreVert /></span>
        </button> */}

        {drop?
        <div class="absolute right-0 z-20 w-56 py-2 mt-2 overflow-hidden bg-white rounded-md shadow-xl dark:bg-gray-800">

        <hr class="border-gray-200 dark:border-gray-700 "/>
        
        <a href="#" class="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
          <Link to={`/userProfile`}>view profile</Link>
        </a>

        <a href="#" class="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
          <span onClick={(e)=>handleLogout(e)}>logout</span> 
        </a>


        </div>:null
        }
        
    </div>
     </div>
    </>
       {/* <Link to='/userProfile'> */}
      
        {/* </Link> */}
       {/* <button onClick={(e)=>handleLogout(e)}>Logout</button> */}
     </div>
    </div>
    {showNotification&&
    <div className='notifications'>
    {notifications.map((n)=>displayNotifications(n))}
    <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-collapse-toggle="toast-default" aria-label="Close">
        <span class="sr-only">Close</span>
        <svg class="w-5 h-5" fill="currentColor"  onClick={handleRead} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </button>
   </div>}
    
    </>
  )
}

export default Navbar


