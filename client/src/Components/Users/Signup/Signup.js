import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import OTPInput, { ResendOTP } from "otp-input-react";
import Countdown from 'react-countdown';


function Signup() {
    const [name, SetName] = useState('');
    const [email, SetEmail] = useState('');
    const [password, SetPassword] = useState('');
    const [confirm, SetConfirm] = useState('');
    const [OtpModal, setOtpModal] = useState(false)
    const [OtpError, setOtpError] = useState('')
    const [OTP, setOTP] = useState('');
    const [UserDetails, setUserDetails] = useState({})
    const [errorMessage, setErrorMessage] = useState('')
    const [Resend, setResend] = useState(false)
    const navigate = useNavigate()



    const handleConfirm = (e) => {
        SetConfirm(e.target.value)
    }
    const axiosInstance=axios.create({
        baseURL:process.env.REACT_APP_API_URL,
       })

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (!name) {
                setErrorMessage("Name is required");
            } else if (name.length < 3) {
                setErrorMessage("Name must be atleast 3 characters");
            } else if (!name.match(/^[A-Za-z][A-Za-z ]*$/)) {
                setErrorMessage("Enter a valid name");
            } else if (!email) {
                setErrorMessage("Email is required");
            } else if (!email.match(/^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)) {
                setErrorMessage("Enter a valid email");
            } else if (!password) {
                setErrorMessage("Password is required");
            } else if (password.length < 4) {
                setErrorMessage("Password must be atleast 4 characters");
            } else if (password.length > 20) {
                setErrorMessage("Password must be less than 20 characters");
            } else if (password != confirm) {
                setErrorMessage("Password does not matched");
            } else {
                const { data } = await axiosInstance.post(`register`, {
                    username: name,
                    email: email,
                    password: password
                })
                console.log('data');
                console.log(data);
                if (data) {
                    if (data.user) {
                        setUserDetails(data.user)
                        setOtpModal(true)
                        setTimeout(() => {
                            setResend(true);
                        }, "20000");

                    } else {
                        setErrorMessage(data.msg)
                    }
                } else {
                    setErrorMessage('Something went wrong')
                }

            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const onVerify = (e) => {
        e.preventDefault()
        const data = {
            OTP: OTP,
            user: UserDetails._id
        }

        if (OTP.length < 6) {
            setOtpError('Enter A 6 digit Otp')
        } else {

            axios.post('http://localhost:5000/verifyOtp', data).then((response) => {
                console.log(response.data)
                if (response.data.verified) {
                    navigate('/')
                }
                setOtpError(response.data.msg)
            })
        }
    }

    const resendOtp = async () => {
        await axios
            .post("http://localhost:5000/resendOtp", UserDetails)
            .then((response) => {
                setResend(!Resend);
                setTimeout(() => {
                    setResend(true);
                }, "20000");
            });
    };


    return (
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
                                <img alt="" className="h-14 w-14"
                                    src="https://media.istockphoto.com/vectors/impossible-triangle-penrose-optical-illusion-purple-gradient-endless-vector-id1210588277" />
                            </div>
                            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Signup to create an account
                            </h2>
                            <p className="mt-2 text-center text-sm text-gray-600 mt-5">Already have an account?
                                <Link to='/' className="font-medium text-purple-600 hover:text-purple-500">
                                    Login
                                </Link>
                            </p>
                            <form className='max-w-[500px] w-full h-max mx-auto rounded-lg p-8 px-8 ' onSubmit={handleSubmit}>
                                {errorMessage && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">{errorMessage}</div>}
                                <div className='flex flex-col text-gray-400 py-2'>
                                    <label className='text-gray-400 text-bold'>Username</label>
                                    <input className='rounded-lg  mt-2 p-2 border border-black hover:bg-purple-50 hover:border-purple-500' type="text" value={name}
                                        onChange={(e) => SetName(e.target.value)} />
                                </div>
                                <div className='flex flex-col text-gray-400 py-2'>
                                    <label className='text-gray-400 text-bold'>Email</label>
                                    <input className='rounded-lg  mt-2 p-2 border border-black hover:bg-purple-50 hover:border-purple-500' type="text" value={email}
                                        onChange={(e) => SetEmail(e.target.value)} />
                                </div>
                                <div className='flex flex-col text-gray-400 py-2'>
                                    <label className=''>Password</label>
                                    <input className='p-2 rounded-lg  mt-2  border border-black hover:bg-slate-100 hover:border-purple-500' type="password" value={password}
                                        onChange={(e) => SetPassword(e.target.value)} />
                                </div>
                                <div className='flex flex-col text-gray-400 py-2'>
                                    <label className='text-gray-400 text-bold'>Confirm password</label>
                                    <input className='rounded-lg  mt-2 p-2 border border-black hover:bg-purple-50 hover:border-purple-500' type="password" value={confirm}
                                        onChange={handleConfirm} />
                                </div>

                                <button className='w-full my-5 py-2 bg-purple-600 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/40 text-white font-semibold rounded-lg'>Signup</button>

                            </form>
                        </div>


                    </div>
                </div>
            </div>
            {
                OtpModal ?
                    <div className=" absolute w-full h-full backdrop-blur-sm  py-20 px-3 flex items-center">

                        <div className="container mx-auto">
                            <div className="max-w-sm mx-auto md:max-w-lg">
                                <div className="w-full">
                                    <div className="bg-gradient-to-r from-purple-400 to-purple-500 h-64 py-3 rounded text-center">
                                        <h1 className="text-2xl font-bold">OTP Verification</h1>
                                        <div className="flex flex-col mt-4">
                                            <span>Enter the OTP you received at</span>
                                            <span className="font-bold">{UserDetails?.email}</span>

                                        </div>

                                        <div className=" flex justify-center pt-2">
                                            {Resend ? (
                                                null
                                            ) : (
                                                <Countdown date={Date.now() + 20000} />
                                            )}
                                            {/* <Countdown date={Date.now() + 100000} /> */}
                                        </div>
                                        <div id="otp" className="flex flex-row justify-center text-center px-4 mt-5">
                                            <OTPInput value={OTP} onChange={setOTP} autoFocus OTPLength={6} otpType="number" disabled={false} />
                                        </div>
                                        <p className='text-red-500 font-[8px] mb-3 pl-3'>{OtpError}</p>

                                        <div className="flex justify-center text-center mt-5">
                                           {Resend?
                                           <button className='flex items-center text-green-500 hover:text-white hover:bg-green-500 cursor-pointer font-bold bg-white rounded-lg px-2 py-1 ' onClick={(e) => resendOtp(e)}>Resend</button>:
                                           <button className='flex items-center text-green-500 hover:text-white hover:bg-green-500 cursor-pointer font-bold bg-white rounded-lg px-2 py-1 ' onClick={(e) => onVerify(e)}>Verify</button>
                                           }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    : null
            }
        </div>

    )
}

export default Signup
