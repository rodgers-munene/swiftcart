import React, { useEffect, useState } from 'react'
import logo from '../../assets/logo.svg'
import Google from '../../assets/google.png'
import { useNavigate } from 'react-router-dom'
import Notification from '../../components/notification'
import Loader from '../../components/Loader'



const Signup = () => {
    
    const [formData, setFormData] = useState({ //get data from the form on submit
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [message, setMessage] = useState();
    const [show, setShow] = useState(false);

   
    // validation form data

    const validateForm =() => {
        const {password, confirmPassword, email, firstName, lastName} = formData

        if(password !== confirmPassword) return "Passwords don't match";
        if(!password || !confirmPassword || !email || !firstName || !lastName) return "All fields are required!!"
        if (!/[A-Za-z]/.test(password)) return 'Password must contain at least one letter';
        if (!/\d/.test(password)) return 'Password must contain at least one number';
        if (!/[^A-Za-z0-9]/.test(password)) return 'Password must contain at least one special character';
        
        return null; //no validation error
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData({...formData, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const err = validateForm();

        if(err){
            console.log(err)
            setMessage(err)
            setShow(true)
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('http://localhost:5001/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            if(!response.ok){
                const errorData = await response.json();
                setMessage(errorData.error || "Registration Failed")
                setShow(true)
                return;
            }

            setMessage("Registration successful, Please Login")
            setShow(true)
            console.log("Registration successful, please login to continue!")
            setTimeout(() => navigate('/login'), 1500)
            
        } catch (error) {
            console.log(error);
            return;
        }finally{
            setLoading(false)
           
        }
    }


  return (
    <div className='flex flex-col md:flex-row items-center justify-center w-screen h-screen bg-gray-200'>
        {/* logo div */}
        <div className='bg-white w-80 h-20 md:w-96 md:h-[30rem] md:border-r flex items-center justify-center md:flex-col'>
            <img src={logo} alt="Logo svg file" className='w-10 h-10 md:w-28 md:h-28 mr-2 sm:mr-0'/>
            <h1 className='text-2xl font-bold text-amber-700'>SwiftCart</h1>
        </div>
        <div className='bg-white w-80 md:w-96 h-[30rem]'>
            
            <form action="" method="post" className='relative min-w-full h-full flex flex-col justify-around'>
                {/* title */}
                <div className='w-full'>
                    <h1 className='text-2xl font-bold pl-5 text-black'>Sign Up</h1>

                </div>
                {/* Username input */}
                <div className='flex w-full justify-center'>
                    <div className='flex flex-col w-[44%] mr-2'>
                        <label htmlFor="firstName" className='font-medium text-black'>First Name</label>
                        <input
                         name='firstName'
                         className='bg-gray-200 h-10 pl-3 outline-0 text-gray-800 rounded-md'
                         type="text"
                         id='firstName'
                         required
                         value={formData.firstName}
                         onChange={handleChange}
                         placeholder='John'/>
                    </div>

                    <div className='w-[44%] flex flex-col'>
                        <label htmlFor='lastName' className='font-medium text-black'>Last Name</label>
                        <input
                         name='lastName'
                         className='w-full bg-gray-200 h-10 pl-3 outline-0 text-gray-800 rounded-md'
                         type="text"
                         id='lastName'
                         required
                         value={formData.lastName}
                         onChange={handleChange}
                         placeholder='Doe'/>
                    </div>
                </div>
                {/* email input */}
                <div className='w-full flex flex-col items-center'>
                    <label htmlFor="email" className='w-[90%] font-medium text-black'>Email</label>
                    <input
                     name='email'
                     type="email"
                     className='w-[90%] bg-gray-200 h-10 pl-3 outline-0 text-gray-800 rounded-md'
                     required
                     value={formData.email}
                     onChange={handleChange}
                     placeholder='johndoe@example.com'/>
                </div>
                {/* password input */}
                <div className='w-full flex flex-col items-center'>
                    <label htmlFor="password" className='w-[90%] font-medium text-black'>Password</label>
                    <input
                    name='password'
                    type="password"
                    className='w-[90%] bg-gray-200 h-10 pl-3 outline-0 text-gray-800 rounded-md'
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder='Enter your password'/>
                </div>
                {/* confirm password input */}
                 <div className='w-full flex flex-col items-center'>
                    <label htmlFor="password" className='w-[90%] font-medium text-black'>Confirm Password</label>
                    <input
                     name='confirmPassword'
                     type="password"
                     className='w-[90%] bg-gray-200 h-10 pl-3 outline-0 text-gray-800 rounded-md'
                     required
                     value={formData.confirmPassword}
                     onChange={handleChange}
                     placeholder='Confirm your password'/>
                </div>
                {/* buttons */}
                <div className='w-full flex flex-col items-center'>
                    <button 
                    onClick={handleSubmit}
                    type="submit"
                    disabled={loading}
                    className='w-[90%] bg-blue-600 text-white h-10 pl-3 rounded-lg mb-2'>{loading ? 'Registering...' : 'Register'}</button>
                    
                    <button
                     type='button'
                     className='w-[90%] bg-gray-200 h-10 pl-3 rounded-lg flex justify-center items-center text-black'>
                        <img src={Google} alt="" className='w-6 h-6 mr-2'/>
                        Sign up with Google</button>
                </div>


                <div className='w-full flex justify-center'>
                    <p className='text-black'>Already have an account? <a href="/login" className='text-blue-400'>Log in</a></p>
                </div>

                {/* animation loader */}
                {loading && (
                    <div className='text-black absolute top-1/2 left-1/2'>
                    <Loader />
                    </div>
                )}
            </form>

            {show && (<Notification 
                message={message}
                duration={1500}
                onClose={() => setShow(false)}
            />)}

            

        </div>
        
    </div>
  )
}

export default Signup   


// {showPopup && (
//                 <div className="fixed left-0 sm:left-1/3 top-0 w-full sm:w-1/3 z-10 bg-gray-600">
//                 <div className="bg-gray-600 p-4 rounded-lg text-center w-full">
//                     <p className="text-lg font-bold text-green-600">{message}</p>
//                     <button
//                     onClick={() => setShowPopup(false)}
//                     className=" bg-gray-900 text-white p-2 rounded"
//                     >
//                     Close
//                     </button>
//                     <div className='w-full h-1 bg-green-500 absolute bottom-0 left-0'></div>
//                 </div>
//                 </div>
//             )}