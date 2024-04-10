import React from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';
import Logout from './Logout';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Product System</Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">Register</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/product">Product</Link>
            </li>
          </ul>
          <Login />
          <div style={{ marginLeft: '10px' }}></div> 
          <Logout />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
