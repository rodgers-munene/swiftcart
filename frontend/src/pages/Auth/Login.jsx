import React from 'react'
import logo from '../../assets/logo.svg'
import Google from '../../assets/google.png'



const Login = () => {
  return (
    <div className='flex flex-col md:flex-row items-center justify-center w-screen h-screen bg-gray-200'>
        <div className='bg-white w-80 h-20 md:w-96 md:h-[26rem] md:border-r flex items-center justify-center md:flex-col'>
            <img src={logo} alt="Logo svg file" className='w-10 h-10 md:w-28 md:h-28 mr-2 sm:mr-0'/>
            <h1 className='text-2xl font-bold text-amber-700'>SwiftCart</h1>
        </div>
        <div className='bg-white w-80 h-72 md:w-96 md:h-[26rem] flex items-center'>
            <form action="" method="post" className='w-full h-full md:h-3/4 flex flex-col justify-around md:justify-around'>
                <div className='w-full'>
                    <h1 className='text-2xl font-bold pl-5 text-black'>Login</h1>

                </div>
                 <div className='w-full flex flex-col items-center'>
                    <label htmlFor="email" className='w-[90%] font-medium text-black'>Email</label>
                    <input type="email" className='w-[90%] bg-gray-200 h-10 pl-3 outline-0 text-gray-800 rounded-md'
                    required placeholder='johndoe@example.com'/>
                </div>

                <div className='w-full flex flex-col items-center'>
                    <label htmlFor="password" className='w-[90%] font-medium text-black'>Password</label>
                    <input type="email" className='w-[90%] bg-gray-200 h-10 pl-3 outline-0 text-gray-800 rounded-md'
                    required placeholder='Enter your password'/>
                </div>
                
                <div className='w-full flex flex-col items-center'>
                    <button type="submit" className='w-[90%] bg-blue-600 text-white h-10 pl-3 rounded-lg mb-2'>Login</button>
                    
                    <div className='w-[90%] bg-gray-200 h-10 pl-3 rounded-lg flex justify-center items-center cursor-pointer text-black'>
                        <img src={Google} alt="" className='w-6 h-6 mr-2'/>
                        Login with Google</div>
                </div>

                <div className='w-full flex justify-center'>
                    <p className='text-black'>Don't have an account? <a href="/signup" className='text-blue-400'>Sign up</a></p>
                </div>

                
            </form>
        </div>
    </div>
  )
}

export default Login