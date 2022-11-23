import React, { useContext } from 'react'
import './Navbar.css'
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
import Swal from 'sweetalert2'

function Navbar() {
  const user = useSelector((state)=> state.user)
  const navigate=useNavigate()
  const dispatch=useDispatch();
    const handleLogout=async(e)=>{
      e.preventDefault();
      localStorage.removeItem('user')
      dispatch(logout())
      await axios.post('http://localhost:5000/logout')
      navigate('/')
      alert('Are you sure you want to logout?')
    }
   
  return (
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
        <div className='topbarIconItem'>
        <HomeIcon/>
        </div>
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
        <span className="topbarIconBadge">2</span>
        </div>
        <div className='topbarIconItem'>
        <NotificationsIcon/>
        <span className="topbarIconBadge">5</span>
        </div>
       </div>
       <Link to='/userProfile'><img src="/assets/c2.jpg" alt="" className="topbarImg" /></Link>
       {/* <button onClick={(e)=>handleLogout(e)}>Logout</button> */}
     </div>
    </div>
  )
}

export default Navbar


