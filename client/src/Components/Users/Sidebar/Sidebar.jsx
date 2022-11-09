import './Sidebar.css'
import {useState} from 'react'
import axios from 'axios'

function Sidebar() {
  const [post, setPost] = useState({ file: "", })
  function handleChange(e){ 
    setPost({ ...post, [e.target.name]: e.target.value })
}

  const handleSubmit=(e) =>{
    e.preventDefault()
    axios.post(`http://localhost:5000/post`,{...post})
    .then((response)=>{
      console.log(response);
    })
  }
  return (
    <div className='sidebar'>
      <form method="POST" action="/profile-upload-single" enctype="multipart/form-data">
    {/* <div>
        <label>Upload profile picture</label>
        <input type="file" name="profile-file"onChange={(e) => handleChange(e)} required/>
    </div>
    <div>
        <input className='fileUploaded' type="submit" value="Upload" onClick={handleSubmit} />
    </div> */}
    </form>
    </div>
  )
}

export default Sidebar
