
import {  HiOutlineLogout } from "react-icons/hi";
import { MdNotificationsNone ,MdExplore} from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { FiMessageSquare} from "react-icons/fi";
import { BiHome, BiMessageSquareAdd} from "react-icons/bi";
import { CgProfile} from "react-icons/cg";
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import {confirmAlert} from 'react-confirm-alert'
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/userSlice";
import Swal from 'sweetalert2'



function Sidebar() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogout=async(e)=>{
    e.preventDefault()
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
        Swal.fire(
          'logout!',
          'You are logoutted',
          'success'
        )
        localStorage.removeItem('user')
        dispatch(logout())
        navigate('/')
      }
    })   
  }


    const menus = [
        { name: "Home", link: "/home", icon: BiHome },
        { name: "messages", link: "/chat", icon: FiMessageSquare },
        { name: "Create", link: "/home", icon: BiMessageSquareAdd },
        { name: "Explore", link: "/explore", icon: MdExplore },
        { name: "My Profile", link: "/userProfile", icon: CgProfile ,bottom:true},
        { name: "Logout", icon: HiOutlineLogout ,},
      ];


  return (
    <>
    <div hidden className="border shadow-md min-h-screen lg:pl-7 lg:pr-12 bg-white fixed md:block  md:w-20  lg:w-64 overflow-hidden ">
        
        <div hidden className="text-center lg:block flex justify-center ">
          <Link to='/home'>
          <img src='/assets/logofinal.png' ></img>
          </Link>
            
        </div>
        <div className=" flex flex-col gap-6 justify-start relative md:items-center lg:items-start">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={` ${
                menu?.bottom && ""
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-300 rounded-md`}>
             {menu.name == 'Logout'? <div className="md:text-3xl lg:text-2xl" onClick={(e)=>handleLogout(e)}>{React.createElement(menu?.icon, )}</div> :<div className="md:text-3xl lg:text-2xl">{React.createElement(menu?.icon, )}</div> }
              <h2 
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 font-normal pr-8 hidden lg:block`}
              >
                {menu?.name}
              </h2>
             
            </Link>
          ))}
        </div>
      </div>
      
     

</>
    
  );
}

export default Sidebar

