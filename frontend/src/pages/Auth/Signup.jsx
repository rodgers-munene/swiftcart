import React from 'react'
import logo from '../../assets/logo.svg'
import Google from '../../assets/google.png'



const Signup = () => {
  return (
    <div className='flex flex-col md:flex-row items-center justify-center w-screen h-screen bg-gray-200'>
        <div className='bg-white w-80 h-20 md:w-96 md:h-[30rem] md:border-r flex items-center justify-center md:flex-col'>
            <img src={logo} alt="Logo svg file" className='w-10 h-10 md:w-28 md:h-28 mr-2 sm:mr-0'/>
            <h1 className='text-2xl font-bold text-amber-700'>SwiftCart</h1>
        </div>
        <div className='bg-white w-80 md:w-96 h-[30rem]'>
            
            <form action="" method="post" className='w-full h-full flex flex-col justify-around'>
                <div className='w-full'>
                    <h1 className='text-2xl font-bold pl-5 text-black'>Sign Up</h1>

                </div>
                <div className='flex w-full justify-center'>
                    <div className='flex flex-col w-[44%] mr-2'>
                        <label htmlFor="firstName" className='font-medium text-black'>First Name</label>
                        <input className='bg-gray-200 h-10 pl-3 outline-0 text-gray-800 rounded-md'
                        type="text" id='firstName' required placeholder='John'/>
                    </div>

                    <div className='w-[44%] flex flex-col'>
                        <label htmlFor='lastName' className='font-medium text-black'>Last Name</label>
                        <input className='w-full bg-gray-200 h-10 pl-3 outline-0 text-gray-800 rounded-md'
                         type="text" id='lastName' required placeholder='Doe'/>
                    </div>
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
                    <label htmlFor="password" className='w-[90%] font-medium text-black'>Confirm Password</label>
                    <input type="email" className='w-[90%] bg-gray-200 h-10 pl-3 outline-0 text-gray-800 rounded-md'
                    required placeholder='Confirm your password'/>
                </div>

                <div className='w-full flex flex-col items-center'>
                    <button type="submit" className='w-[90%] bg-blue-600 text-white h-10 pl-3 rounded-lg mb-2'>Sign Up</button>
                    
                    <div className='w-[90%] bg-gray-200 h-10 pl-3 rounded-lg flex justify-center items-center cursor-pointer text-black'>
                        <img src={Google} alt="" className='w-6 h-6 mr-2'/>
                        Sign up with Google</div>
                </div>


                <div className='w-full flex justify-center'>
                    <p className='text-black'>Already have an account? <a href="/login" className='text-blue-400'>Log in</a></p>
                </div>


            </form>
        </div>
        
    </div>
  )
}

export default Signup   