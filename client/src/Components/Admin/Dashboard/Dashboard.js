import { useState,useContext} from "react";
import {useNavigate,Link, Navigate} from 'react-router-dom'
import Swal from "sweetalert2";
const Dashboard = () => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(true);
    const Menus = [
    { dashboard: "Dashboard", src: "Chart_fill" },
    // { approve: "Approved List", src: "Chat" },
    // { reject: "Rejected List", src: "User" },
    // { slot: "Booking Slots ", src: "Calendar" },
    // { create: "Create Slots ", src: "Calendar" },
    // { progress: "Progress Status", src: "Search" },
  ];

  const handleLogout=()=>{
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Logout!'
      }).then((result) => {
        console.log('admin logouted');
        navigate('/admin-login');
        if (result.isConfirmed) {
          Swal.fire(
            'Logout!',
            'Logoutted successfully',
            'success'
          )
        }
      })
  }
  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-black h-screen p-5  pt-8 relative duration-300`}
      >
        <img
          src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.cleanpng.com%2Fpng-delta-air-lines-image-computer-icons-logo-vector-g-6970346%2F&psig=AOvVaw0ANZUtKj4r5V1uDwpmVxqC&ust=1667961534616000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCJDxh4nHnfsCFQAAAAAdAAAAABAE"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img 
            src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.cleanpng.com%2Fpng-delta-air-lines-image-computer-icons-logo-vector-g-6970346%2F&psig=AOvVaw0ANZUtKj4r5V1uDwpmVxqC&ust=1667961534616000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCJDxh4nHnfsCFQAAAAAdAAAAABAE"
            className={`cursor-pointer duration-500 h-10 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
           Delta
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
            key={index}
            className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
            ${Menu.gap ? "mt-9" : "mt-2"} ${
              index === 0 && "bg-light-white"
            } `}
          >
              <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" style={{height:'10px',width:'10px'}}/>
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
                <Link to='/adminHome'>{Menu.dashboard}</Link>
                {/* <Link to='/approve'>{Menu.approve}</Link>
                <Link to='/reject'>{Menu.reject}</Link>
                <Link to='/slot'>{Menu.slot}</Link>
                <Link to='/progress'>{Menu.progress}</Link>
                <Link to='/create'>{Menu.create}</Link> */}

              </span>

            </li>

          ))}
        </ul>
        <div className="p-8">
        <button  onClick={handleLogout} type="button" class="inline-block px-6 py-2.5 bg-blue-500 text-dark font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Log Out</button>

        </div>
      </div>

    </div>
  );
};
export default Dashboard;