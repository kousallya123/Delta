import React from 'react'
import './Navbar.css'
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddBoxIcon from '@mui/icons-material/AddBox';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {Link} from 'react-router-dom'

function Navbar() {
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
        <div className='topbarIconItem'>
        <AddBoxIcon/>
        </div>
        <div className='topbarIconItem'>
        <ChatIcon/>
        <span className="topbarIconBadge">2</span>
        </div>
        <div className='topbarIconItem'>
        <NotificationsIcon/>
        <span className="topbarIconBadge">5</span>
        </div>
       </div>
       <img src="/assets/c2.jpg" alt="" className="topbarImg" />
     </div>
    </div>
  )
}

export default Navbar
