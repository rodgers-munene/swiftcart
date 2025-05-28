import React from 'react'

const Navbar = () => {
  return (
    <div className=' flex justify-around items-center'>
      <a href="/">Home</a>
      <a href="">Categories</a>
      <a href="/beauty">Beauty</a>
      <a href="/clothing">Clothing</a>
      <a href="/blog">Blog</a>
      <a href="/contact-us">Contact</a>
    </div>
  )
}

export default Navbar