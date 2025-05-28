import React from 'react'
import ToggleTheme from './toggleTheme'
import Header from './Header'

// function to call all components that are constant in every page eg theme and navbar
const Layout = ( { children } ) => {
  return (
    <div className=''>
      <Header />
      <ToggleTheme /> 
    </div>
  )
}

export default Layout