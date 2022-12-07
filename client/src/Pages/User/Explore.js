import React, { useEffect, useState } from 'react'
import Rightbar from '../../Components/Users/Rightbar/Rightbar'
import axios from 'axios'
import Navbar from '../../Components/Users/Navbar.js/Navbar'
import Sidebar from '../../Components/Users/Sidebar/Sidebar'

function Explore() {
    const PF=process.env.REACT_APP_PUBLIC_FOLDER
    const [video,setVideo]=useState([])
   useEffect(()=>{
    const fetchAllPost= async()=>{
        const res=await axios.get('http://localhost:5000/admin/allPosts')
        setVideo(res.data)
    }
    fetchAllPost()
   },[])

  return (
    <div>
       <Navbar/>
       <div>
       <div className='flex h-screen w-full justify-between'>
        <div hidden className=' md:block md:w-1/4 lg:w-3/12  md:m-2 lg:m-6'>

        <Sidebar />
        </div>
        <div className='md:w-3/4 lg:w-6/12 w-full md:m-2 lg:m-6 items-center grid grid-cols-3 gap-2'>

           {/* <h1 className='flex text-center text-4xl text-gray-600 items-center justify-center'>Explore</h1> */}
            {video.map((v)=>{
             return(
            <div className='flex items-center justify-center'>
            {v?.video &&   <video src={PF+v.video} autoPlay controls className='h-64 w-64'/> }
            <div className=''> {v?.img && <img src={PF+v.img} className='h-64 w-64'></img>}
              </div>
           
             </div>
           )
          })} 
        </div>
        <div hidden className=' lg:block md:w-1/4 lg:w-3/12 md:m-2 lg:m-6'>

        <Rightbar />
        </div>

       </div>

       </div>

    </div>
  )
}

export default Explore


