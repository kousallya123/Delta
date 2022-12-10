import './Share.css'
import {PermMedia,Label,EmojiEmotions,Room, Cancel} from '@mui/icons-material'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';

function Share() {
  const user = useSelector((state)=> state.user)
  const [file,setFile]= useState('')
  const [videofile,setVideoFile]= useState('')
  const [desc,setDesc]=useState('')
  const [image,setImage]=useState('')
  const [video,setVideo]=useState('')
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const submitHandler=async(e)=>{
    e.preventDefault() 
   
    const newPost={
      userId:user._id,
      desc:desc,
    }
    if(file){
      const data=new FormData();
      const fileName=file.name
      data.append("file",file)
      data.append("name",fileName)
      newPost.img=fileName
      
      try {
        await axios.post('http://localhost:5000/post/upload',data,
        {headers:{"x-access-token":localStorage.getItem('usertoken')}})
        window.location.reload()
        
      } catch (error) {
        console.log(error);
      }
    }
    if(videofile){
      console.log('ooho you clicked a vide file');
      const data=new FormData();
      const fileName=videofile.name
      data.append("file",videofile)
      data.append("name",fileName)
      newPost.video=fileName
      
      try {
        await axios.post('http://localhost:5000/post/upload',data,
        {headers:{"x-access-token":localStorage.getItem('usertoken')}})
        
      } catch (error) {
        console.log(error);
      }
    }
    try{
       await axios.post('http://localhost:5000/post',newPost,
       {headers:{"x-access-token":localStorage.getItem('usertoken')}})
    }catch(err){
     console.log(err);
    }
    setFile('')
    setImage('')
    setVideo('')
    setDesc('')
  }

  const onInputChange=(e)=>{
    setImage(URL.createObjectURL(e.target.files[0]))
    {setFile(e.target.files[0]) }
  }

  const onVideoChange=(e)=>{
    setVideo(URL.createObjectURL(e.target.files[0]))
    {setVideoFile(e.target.files[0]) }
  }



  return (
    <>
    <div className='share'>
      <div className='shareWrapper'>
       <div className="shareTop">
        <img src={PF+user.profilePicture} className='shareProfileImg' alt=""></img>  
        <input className="shareInput"placeholder={"What's in your mind " + user.username + "?"} value={desc} onChange={(e)=> {setDesc(e.target.value)}}  required></input>

       </div>
        
       <hr className='shareHr'/>
       {image&& <img src={image} alt="" height="60px" width="60px" className='justify-center border-2 border-blue-200' />}
       {video&&<video src={video} alt="" controls/>}
       
       <form className='shareBottom' onSubmit={submitHandler}>
         <div className="shareOptions">
           <label for='file' className="shareOptions">
            <div  className="item">
            <PermMedia htmlColor="tomato" className='shareIcon'/>
            <span className='shareOptionText'>Photo</span>
            <input style={{display:"none"}} type='file'name='file' id='file'  onChange={onInputChange} accept=".png,.jpg,.webp"/>
            </div>
            </label>
            <label for='videofile' className="shareOptions ml-3">  
            <VideoCameraBackIcon htmlColor="blue" className='shareIcon'/>
            <span className='shareOptionText'>Video</span>
            <input style={{display:"none"}} type='file'name='videofile' id='videofile' onChange={onVideoChange}/>
            </label>
         </div>
         <button className='shareButton' type='submit'>Share</button>  
       </form>   
      </div>  
    </div>
    <div>
    
    </div>
    
  </>
  )
}

export default Share

{/* <form className='shareBottom' onSubmit={submitHandler}>
         <div className="shareOptions">
           <label for='file' className="shareOptions">
            <PermMedia htmlColor="tomato" className='shareIcon'/>
            <span className='shareOptionText'>Photo</span>
            <input style={{display:"none"}} type='file'name='file' id='file' multiple onChange={(e)=>{onInputChange(e)} }/>
           </label>
           <img src={image}  classname= "w-20 h-20 "alt="" />

           
          
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
         </div> 
         <button className='shareButton' type='submit'>Share</button>
        
       </form> */}