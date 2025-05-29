import React from 'react'
import { PhoneCallIcon, MailIcon} from 'lucide-react'
import { FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='w-screen min-h-[80vh] flex flex-col items-center'>

      {/* newsletter section */}
      <div className='flex w-[90%] justify-between h-1/3 border-b-2 border-gray-400 dark:border-gray-50 py-10'>
        <div className='w-1/3'>
          <h1 className='text-3xl font-bold'>Join our newsletter </h1>
          <p className='text-sm'>Register now to get the latest updates on promotion and coupons. Don't worry, we don't spam.</p>
        </div>
        <div className='w-1/3 '>
          <div className='flex w-full'>
            <input type="email" className='h-10 bg-gray-400 w-full outline-0 pl-2 rounded-l-sm text-black' placeholder='Enter your email address'/>
            <button className='px-4 bg-blue-500 rounded-r-sm text-white'>send</button>
          </div>
          <p className='text-xs mt-3'>By subscribing you agree to our <a href="" className='text-blue-600'>Terms and Conditions & Privacy Policy</a></p>
        </div>
      </div>

      {/* links section */}
      <div className='flex w-[90%] justify-between h-auto border-b-2 border-gray-400 dark:border-gray-50 py-10'>
        <div className='w-[300px] flex flex-col justify-between'>
          <h1 className='text-xl font-bold'>Do you need Help</h1>
          <div className='flex items-center'>
            <div><PhoneCallIcon /></div>
            <div className='ml-4'>
              <p>Monday-Friday:08am-09pm</p>
              <h1 className='font-bold text-2xl'>0 707-435-237</h1>
            </div>
          </div>
          <div className='flex items-center'>
            <div><MailIcon /></div>
            <div className='ml-4'>
              <p>Need help with your order?</p>
              <h1 className='font-bold text-xl'>info@example.com</h1>
            </div>
          </div>
        </div>
        <div className='w-[300px]'>
          <h1 className='text-xl font-bold'>Make money with us</h1>
          <div className='flex flex-col pl-2'>
            <a href="" className='py-1'>Sell on SwiftCart</a>
            <a href="" className='py-1'>Become an affiliate</a>
            <a href="" className='py-1'>Advertise with us</a>
            <a href="" className='py-1'>Sell-publish with us</a>
            <a href="" className='py-1'>Become a vendor</a>
          </div>
        </div>
        <div className='w-[300px]'>
            <h1 className='text-xl font-bold'>Let us help you</h1>
            <div className='flex flex-col pl-2'>
              <a href="" className='py-1'>Accessibility statement</a>
              <a href="" className='py-1'>Your orders</a>
              <a href="" className='py-1'>Shipping rates and policies</a>
              <a href="" className='py-1'>Refund and return policy</a>
              <a href="" className='py-1'>Privacy policy</a>
              <a href="" className='py-1'>Terms and Conditions</a>
            </div>
        </div>
        <div className='w-[300px]'>
            <h1 className='text-xl font-bold'>Get to know us</h1>
            <div className='flex flex-col pl-2'>
              <a href="" className='py-1'>Careers for SwiftCart</a>
              <a href="" className='py-1'>About Swiftcart</a>
              <a href="" className='py-1'>Investor Relations</a>
              <a href="" className='py-1'>Customer Relations</a>
              <a href="" className='py-1'>Store locations</a>
            </div>
        </div>

      </div>

      {/* copyright section */}
      <div className='flex justify-around w-[90%] pt-2'>
        {/* social links */}
          <div className='flex w-32 justify-between'>
            <FaFacebook className='text-blue-600 text-3xl cursor-pointer'/>
            <FaTwitter className='text-blue-500 text-3xl cursor-pointer'/>
            <FaInstagram className='text-red-500 text-3xl cursor-pointer'/>
          </div>

        {/* copyright warning */}
        <div>
          <p>Copyright @2025 SwiftCart Store. All rights reserved. </p>
        </div>
      </div>

    </div>
  )
}

export default Footer