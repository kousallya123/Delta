import React,{useContext, useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../../redux/userSlice'
import Swal from 'sweetalert2'
import NotFound from '../../NotFound'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const user = useSelector((state)=> state.user)
    const [error,setError]=useState('')
    const axiosInstance=axios.create({
        baseURL:process.env.REACT_APP_API_URL,
       })
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
             if (!email) {
                setErrorMessage("Email is required");
            } else if (!email.match(/^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)) {
                setErrorMessage("Enter a valid email");
            } else if (!password) {
                setErrorMessage("Password is required");
            } else if (password.length < 4) {
                setErrorMessage("Password must be atleast 4 characters");
            } else if (password.length > 20) {
                setErrorMessage("Password must be less than 20 characters");
            } else {
                const { data } = await axiosInstance.post('login', {
                    email: email,
                    password: password
                });
               
                if (data) {
                    if (data.user) {
                        Swal.fire({
                            position: 'top-end',
                            text: 'Login success',
                            showConfirmButton: false,
                            timer: 1500,
                            background:'MediumSeaGreen',
                            color:'white',
                          })
                        navigate("/home"); 
                        localStorage.setItem('user', JSON.stringify(data.user))
                        localStorage.setItem('usertoken',(data.usertoken))
                        dispatch(login(data.user))        
                       
                    } else {
                        setErrorMessage(data.msg)
                    }
                }else{
                    setErrorMessage('Something went wrong')
                }
            }
        } catch (error) {
            console.log(error.message);
            setError(error)
        }
    }
  return (
    <>
    {error?  <NotFound error={error}/> :
     <div class="flex items-center min-h-screen bg-gray-50">
     <div class="flex-1 h-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl">
         <div class="flex flex-col md:flex-row">
             <div class="h-32 md:h-auto md:w-1/2">
                 <img class="object-cover w-full h-full" src="https://source.unsplash.com/user/erondu/1600x900"
                     alt="img" />
             </div>
             <div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                 <div class="w-full">
            <div className="flex justify-center">
              <img alt=""className="h-14 w-14"
                  src="https://media.istockphoto.com/vectors/impossible-triangle-penrose-optical-illusion-purple-gradient-endless-vector-id1210588277"/>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 mt-5">Don't have an account yet?
            <Link to='/signup'  className="font-medium text-purple-600 hover:text-purple-500">
               Signup
            </Link>
            </p>
           <form className='max-w-[400px] w-full h-max mx-auto rounded-lg p-8 px-8 ' onSubmit={handleSubmit}>
                {errorMessage && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">{errorMessage}</div>}
       
                <div className='flex flex-col text-gray-400 py-2'>
                    <label className='text-gray-400 text-bold'>Email</label>
                    <input className='rounded-lg  mt-2 p-2 border border-black hover:bg-purple-50 hover:border-purple-500' type="text" value={email}  onChange={(e)=> {setEmail(e.target.value)}}/>
                </div>
                <div className='flex flex-col text-gray-400 py-2'>
                    <label className=''>Password</label>
                    <input className='p-2 rounded-lg  mt-2  border border-black hover:bg-purple-50 hover:border-purple-500' type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                </div>
                <button className='w-full my-5 py-2 bg-purple-600 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/40 text-white font-semibold rounded-lg'>Login</button>  
            </form>
            <p className=" text-center text-sm text-gray-600 mt-5">Forgot your password?
            <Link to='/password'  className="font-medium text-purple-600 hover:text-purple-500">
               Click here
            </Link>
            </p>
         </div>

                     
                 </div>
             </div>
         </div>
     </div>
   
  }
  </>
  )
}

export default Login