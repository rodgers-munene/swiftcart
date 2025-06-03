import React, { useState } from 'react'
import logo from '../../assets/logo.svg'
import Google from '../../assets/google.png'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import Notification from '../../components/notification'
import Loader from '../../components/Loader'



const Login = () => {
 const navigate = useNavigate();
 const {setUser} = useAuth();
 const [formData, setFormData] = useState({
    email: '',
    password: ''
 })
 const [loading, setLoading] = useState(false)
 const [message, setMessage] = useState("")
 const [show, setShow] = useState(false)

 const validateForm = () => {
    const {email, password} = formData

    if(!email || !password) return "All fields are mandatory";

    return null;
 }

 const handleChange = (e) => {
    const {name, value} = e.target
    setFormData({...formData, [name]: value} )
 }

 const handleSubmit = async (e) => {

    e.preventDefault()

    const err = validateForm();

    if (err) {
        setMessage(err);
        setShow(true)
        return;
    }

    setLoading(true);
    try {
        const response = await fetch('http://localhost:5001/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        if(!response.ok){
            const errorData = await response.json()
            setMessage(errorData.error || "Incorrect details!")
            setShow(true)
            return;
        }

        const data = await response.json()
        localStorage.setItem('token', data.accessToken)

        // decode the token to get the expiry time and store it in local storage
        const decoded = jwtDecode(data.accessToken)
        const expiresAt = decoded.exp * 1000
        localStorage.setItem('expiresAt', expiresAt)

        localStorage.setItem('user', data.user)
        setUser(localStorage.getItem('user'))
        
        setMessage("Login Successful")
        setShow(true)
        setTimeout(() => navigate('/'), 1000)
    } catch (error) {
        setMessage("Error logging you in!! Please try again.")
        setShow(true)
        return;
    }finally {
        setLoading(false)
    }
 }


  return (
    <div className='flex flex-col md:flex-row items-center justify-center w-screen h-screen bg-gray-200'>
        <div className='bg-white w-80 h-20 md:w-96 md:h-[26rem] md:border-r flex items-center justify-center md:flex-col'>
            <img src={logo} alt="Logo svg file" className='w-10 h-10 md:w-28 md:h-28 mr-2 sm:mr-0'/>
            <h1 className='text-2xl font-bold text-amber-700'>SwiftCart</h1>
        </div>
        <div className='bg-white w-80 h-72 md:w-96 md:h-[26rem] flex items-center'>
            <form onSubmit={handleSubmit} className='relative min-w-full h-full md:h-3/4 flex flex-col justify-around md:justify-around'>
                <div className='w-full'>
                    <h1 className='text-2xl font-bold pl-4 md:pl-5 text-black'>Login</h1>

                </div>
                 <div className='w-full flex flex-col items-center'>
                    <label htmlFor="email" className='w-[90%] font-medium text-black'>Email</label>
                    <input
                    name='email'
                    type="email"
                    className='w-[90%] bg-gray-200 h-10 pl-3 outline-0 text-gray-800 rounded-md'
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder='johndoe@example.com'/>
                </div>

                <div className='w-full flex flex-col items-center'>
                    <label htmlFor="password" className='w-[90%] font-medium text-black'>Password</label>
                    <input
                    name='password' 
                    type="password"
                    className='w-[90%] bg-gray-200 h-10 pl-3 outline-0 text-gray-800 rounded-md'
                    value={formData.password}
                    onChange={handleChange}
                    required 
                    placeholder='Enter your password'/>
                </div>
                
                <div className='w-full flex flex-col items-center'>
                    <button
                    disabled={loading} 
                    type="submit" 
                    className='w-[90%] bg-blue-600 text-white h-10 pl-3 rounded-lg mb-2'>{loading? "Logging in..." : "Login"}</button>
                    
                    <button type='button' className='w-[90%] bg-gray-200 h-10 pl-3 rounded-lg flex justify-center items-center text-black'>
                        <img src={Google} alt="" className='w-6 h-6 mr-2'/>
                        Login with Google</button>
                </div>

                <div className='w-full flex justify-center'>
                    <p className='text-black'>Don't have an account? <a href="/signup" className='text-blue-400'>Sign up</a></p>
                </div>

                 {loading && (
                    <div className='text-black absolute top-1/2 left-1/2'>
                    <Loader />
                    </div>
                )}
            </form>

            {show && (<Notification 
                message={message}
                duration={1000}
                onClose={() => setShow(false)}
            />)}

        </div>
    </div>
  )
}

export default Login