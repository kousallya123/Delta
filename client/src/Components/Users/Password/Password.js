import axios from 'axios'
import React, { useState } from 'react'
import {Link} from 'react-router-dom'

function Password() {

  const [email,setEmail]=useState('')
  const [message,setMessage]=useState(false)
  const [errorMessage,setErrorMessage]=useState('')

  const sendLink=async(e)=>{
    e.preventDefault()
    try {    
    const res=await axios.post('/sendPasswordLink',{email:email})
    if(res.data==='Email send successfully'){
      setMessage(true)
    }else{
      setErrorMessage('Enter a valid mail')
    }
      
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message)
    }
  
  }
  return (
    <div class="flex items-center h-screen">
      <div class=" bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
      <span class="block  text-xl  font-bold mb-4">Forgot Your Password</span>   
      {errorMessage && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">{errorMessage}</div>}
      {message && <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">Check your mail</div>}
        <form class="mb-4" action="/" method="post">
          <div class="mb-4  items-center">
            <label for="email" class="block text-xs mb-1">Enter Email</label>
            {/* <input class=" border rounded p-2 outline-none focus:shadow-outline" type="email" name="email" id="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
             */}
              <input className='w-full rounded-lg  mt-2 p-2 border border-black hover:bg-purple-50 hover:border-purple-500' type="email" required
               placeholder='enter your email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
          </div>

          <button className='ml-16 px-2 my-5 py-2 bg-purple-600 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/40 text-white font-semibold rounded-lg' onClick={sendLink}>Send email </button>
        </form>
        <Link to='/'>
        <p class="text-purple-500 text-center text-sm" >Back to login</p>
        </Link>
    </div>
  </div>
  )
}

export default Password
