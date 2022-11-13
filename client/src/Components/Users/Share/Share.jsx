import './Share.css'
import {PermMedia,Label,EmojiEmotions,Room} from '@mui/icons-material'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../features/userReducer'
import axios from 'axios'

function Share() {
  const user=useSelector(selectUser)
  const [file,setFile]= useState('')
  const [desc,setDesc]=useState('')
  const submitHandler=async(e)=>{
    e.preventDefault() 
    const newPost={
      userId:user.user._id,
      desc:desc,
    }
    if(file){
      const data=new FormData();
      const fileName=Date.now()+file.name
      data.append("file",file)
      data.append('name',fileName)
      newPost.img=fileName
      try {
        await axios.post(`http://localhost:5000/upload`,data)
        
      } catch (error) {
        console.log(error);
      }
    }
    try{
       await axios.post('http://localhost:5000/post',newPost)
    }catch(err){
     console.log(err);
    }
  }
  return (
    <div className='share'>
      <div className='shareWrapper'>
       <div className="shareTop">
        <img src={user.profilePicture? user.profilePicture:'/assets/c2.jpg'} className='shareProfileImg' alt=""></img>  
        <input placeholder="what's in your mind?" className='shareInput' value={desc}  onChange={(e)=> {setDesc(e.target.value)}}></input>

       </div>
       <hr className='shareHr'/>
       <form className='shareBottom' onSubmit={submitHandler}>
         <div className="shareOptions">
           <label for='file' className="shareOptions">
            <PermMedia htmlColor="tomato" className='shareIcon'/>
            <span className='shareOptionText'>Photo</span>
            <input style={{display:"none"}} type='file' id='file' onChange={(e)=>setFile(e.target.files[0])}/>
           </label>
         </div>
         {/* <div className="shareOptions">
           <div className="shareOptions">
            <Label htmlColor="blue" className='shareIcon'/>
            <span className='shareOptionText'>Tag</span>
           </div>
         </div>
         <div className="shareOptions">
           <div className="shareOptions">
            <EmojiEmotions htmlColor="green"className='shareIcon'/>
            <span className='shareOptionText'>Feelings</span>
           </div>
         </div>
         <div className="shareOptions">
           <div className="shareOptions">
            <Room htmlColor="goldenrod" className='shareIcon'/>
            <span className='shareOptionText'>Location</span>
           </div>
         </div> */}
         <button className='shareButton' type='submit'>Share</button>
       </form>
      </div>
    </div>
  )
}

export default Share
