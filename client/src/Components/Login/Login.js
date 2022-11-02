import React from 'react'
import {Link} from 'react-router-dom'


function Login() {
  return (
    <div>
     <div className="mb-10 mt-7">
            <div className="flex justify-center">
                <img alt=""className="h-14 w-14"
                  src="https://media.istockphoto.com/vectors/impossible-triangle-penrose-optical-illusion-purple-gradient-endless-vector-id1210588277"/>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 mt-5">Don't have an account yet?
            <Link to='/'  className="font-medium text-purple-600 hover:text-purple-500">
               Signup
            </Link>
            </p>
        </div>
        <form className='max-w-[400px] w-full h-max mx-auto rounded-lg p-8 px-8 '>
                {/* {errorMessage && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">{errorMessage}</div>} */}
       
                <div className='flex flex-col text-gray-400 py-2'>
                    <label className='text-gray-400 text-bold'>Email</label>
                    <input className='rounded-lg  mt-2 p-2 border border-black hover:bg-slate-100 hover:border-purple-500' type="text" />
                </div>
                <div className='flex flex-col text-gray-400 py-2'>
                    <label className=''>Password</label>
                    <input className='p-2 rounded-lg  mt-2  border border-black hover:bg-slate-100 hover:border-purple-500' type="password"  />
                </div>
          
                <button  className='w-full my-5 py-2 bg-purple-600 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/40 text-white font-semibold rounded-lg'>Login</button>
               
        </form>
    </div>
  )
}

export default Login
