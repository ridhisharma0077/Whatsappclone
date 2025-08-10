import React from 'react'
import chats from './assets/chat.png'
import call from './assets/telephone.png'
import status from './assets/updates.png'
import setting from './assets/settings.png'
import star from './assets/star.png'
import archieve from './assets/box.png'
import photo from './assets/photo.jpg'
import './Navbar.css'
// import {NavLink} from 'react-router-dom'

const Navbar = () => {
  return (
    <>
      <nav className='navbar'>
                        <div className='navflex'>
                <img src={chats} className="img1"/>
                <img src={call} className="img1"/>
                <img src={status} className="img1"/>
                <img src={star} className="mid img1"/>
                <img src={archieve} className="img1"/>
                <img src={setting} className="img1"/>
                <img src={photo} className="photo"/>
                            </div>
                    </nav>
    </>
  )
}

export default Navbar