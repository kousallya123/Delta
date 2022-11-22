import "./Profile.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import Navbar from "../Navbar.js/Navbar";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().username;
  useEffect(()=>{
    axios.get(`/users?username=${username}`).then((res)=>{
      setUser(res.data)
      
    })
  })

 console.log(user,"postsss");

  return (
    <>
      <div className="profile">
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : "/assets/cover1.jpg"
                }
                alt=""
              />
              <img
                className="profileUserImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : "/assets/avatar.jpg"
                }
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.email}</span>
            </div>
            <div className='follow'>
              Followers{user?.followers?.length}<br/>
              Followings{user?.followings?.length}
            </div>
             
            <div class="px-px md:px-3">
    <ul class="flex items-center justify-around md:justify-center space-x-12  
                  uppercase tracking-widest font-semibold text-xs text-gray-600
                  border-t">

      <li class="md:border-t md:border-gray-700 md:-mt-px md:text-gray-700">
        <a class="inline-block p-3" href="#">
          <i class="fas fa-th-large text-xl md:text-xs"></i>
          <span class="hidden md:inline">post</span>
        </a>
      </li>
    </ul>
    <div class="flex flex-wrap -mx-px md:-mx-3">
{/* {console.log(currentpost,'kkkkkkkkkkoooooooooooooooooo')}
{currentpost?.map((obj)=>{
      return(
          
      <div key={obj} class="w-1/3 p-px md:px-3">
      <a href="#">
        <article class="post bg-gray-100 text-white relative pb-full md:mb-6">
          <img class="w-full h-full absolute left-0 top-0 object-cover" src={PF+obj.img} alt="image"/>

          <i class="fas fa-square absolute right-0 top-0 m-1"></i>
          <div class="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute 
                            left-0 top-0 hidden">
            <div class="flex justify-center items-center 
                                space-x-4 h-full">
              <span class="p-2">
                <i class="fas fa-heart"></i>
                {obj?.likes?.length}
              </span>

              <span class="p-2">
                <i class="fas fa-comment"></i>
                2,909
              </span>
            </div>
          </div>

        </article>
      </a>
       </div>

      )
    })
    }   */}
    </div>
  </div>

          </div>
        </div>
      </div>
    </>
  );
}