import React from 'react'
import './Logo.css'
import logo from '../../assets/logo.png'
const Logo = () => {
  return (
    <div className='logo-container'>
        <img src={logo} alt="githubLogo" className='logo-g'/>
        <h1 className='logo-text'>Github Profile Viewer</h1>
        </div>
  )
}

export default Logo
