import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import axios from "axios";
import { useParams,useNavigate } from "react-router";

function ForgotPassword() {
  const [password, SetPassword] = useState('');
  const [confirm, SetConfirm] = useState('');
  const [errorMessage,setErrorMessage]=useState('')
  const navigate=useNavigate()
  const userId = useParams().id;
  const userToken=useParams().token;
  const handleConfirm = (e) => {
    SetConfirm(e.target.value)
}


const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    if (!password) {
      setErrorMessage("Password is required");
    } else if (password.length < 4) {
      setErrorMessage("Password must be atleast 4 characters");
    } else if (password.length > 20) {
      setErrorMessage("Password must be less than 20 characters");
    } else if (password != confirm) {
      setErrorMessage("Password does not matched");
    }else{
      const response=await axios.put(`http://localhost:5000/updatePassword/${userId}`, {password:password,userId:userId,token:userToken})
     if(response.data){
        navigate('/')
     }else{
      setErrorMessage(response.error)
     }
    }
    
  } catch (error) {
    console.log(error);
  }}


  return (
    <div class="flex items-center h-screen">
      <div class=" bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
      <span class="block  text-xl  font-bold mb-4">Enter new Password</span>   
        <form class="mb-4"  onSubmit={handleSubmit}>
        {errorMessage && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">{errorMessage}</div>}
                                <div className='flex flex-col text-gray-400 py-2'>
                                    <label className=''>Enter new Password</label>
                                    <input className='p-2 rounded-lg  mt-2  border border-black hover:bg-slate-100 hover:border-purple-500' type="password" value={password}
                                        onChange={(e) => SetPassword(e.target.value)} />
                                </div>
                                <div className='flex flex-col text-gray-400 py-2'>
                                    <label className='text-gray-400 text-bold'>Confirm password</label>
                                    <input className='rounded-lg  mt-2 p-2 border border-black hover:bg-purple-50 hover:border-purple-500' type="password" value={confirm}
                                        onChange={handleConfirm} />
                                </div>

                                <button className='w-full my-5 py-2 bg-purple-600 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/40 text-white font-semibold rounded-lg'>Update password</button>
        </form>
        <Link to='/'>
        <p class="text-purple-500 text-center text-sm" >Back to login</p>
        </Link>
    </div>
  </div>
  )
}

export default ForgotPassword