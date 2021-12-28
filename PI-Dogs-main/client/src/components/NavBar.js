import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import styles from "./NavBar.css"

export default function NavBar() {
  return (
    <header className="navbar">
    <div >
      
      <nav>
        <ul className='list'>
          <li className='list-item'>
      <NavLink  to="/home" >Home </NavLink>
      
      <NavLink  to="/about">About</NavLink>
      
      <NavLink  to="/myDog">My Dog</NavLink>
      </li>
      </ul>
      </nav>
      
    </div>
    </header>
  );
};