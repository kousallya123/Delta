import './Share.css'
import {PermMedia,Label,EmojiEmotions,Room, Cancel} from '@mui/icons-material'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

function Share() {
  const user = useSelector((state)=> state.user)
  const [file,setFile]= useState([])
  const [desc,setDesc]=useState('')
  const [image,setImage]=useState('')
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
        await axios.post('http://localhost:5000/post/upload',data)
        window.location.reload()
        
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

  const onInputChange=(e)=>{
    setImage(URL.createObjectURL(e.target.files[0]))
    {setFile(e.target.files[0]) }
  }



  return (
    <>
    <div className='share'>
      <div className='shareWrapper'>
       <div className="shareTop">
        <img src={PF+user.profilePicture} className='shareProfileImg' alt=""></img>  
        <input className="shareInput"placeholder={"What's in your mind " + user.username + "?"} onChange={(e)=> {setDesc(e.target.value)}}  required></input>

       </div>
        
       <hr className='shareHr'/>
       <img src={image} alt=""/>
       
       <form className='shareBottom' onSubmit={submitHandler}>
         <div className="shareOptions">
           <label for='file' className="shareOptions">
            <div  className="item">
            <PermMedia htmlColor="tomato" className='shareIcon'/>
            <span className='shareOptionText'>Photo</span>
            </div>
            <input style={{display:"none"}} type='file'name='file' id='file' multiple  onChange={onInputChange}/>
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