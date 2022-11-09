import React from 'react'
import Feed from '../../Components/Users/Feed/Feed'
import Navbar from '../../Components/Users/Navbar.js/Navbar'
import Rightbar from '../../Components/Users/Rightbar/Rightbar'
import Sidebar from '../../Components/Users/Sidebar/Sidebar'
import './Home.css'

function Homepage() {
  return (
    <>
      <Navbar/>
      <div className="homeContainer">
      <Sidebar/>
      <Feed/>
      <Rightbar/>
      
      </div>
    </>
  )
}

export default Homepage
