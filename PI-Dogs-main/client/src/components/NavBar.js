import React from 'react';
import { NavLink, Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <div className="nav-bar">
      <div>
{/* ver si cambió algo en la nueva -v */}
      <NavLink exact to="/" activeStyle={{color:"blue", backgroundColor: "grey"}}>Home </NavLink>
      </div>
      <div>
      <NavLink  to="/about"activeStyle={{color:"blue", backgroundColor: "grey"}}>About</NavLink>
      </div>
      <div>
          <NavLink  to="/myDog"activeStyle={{color:"blue", backgroundColor: "grey"}}>My Dog</NavLink>
      </div>
      {/* poner el About, About my favourite dog: Alfi, etc */}
      
    </div>
  );
};