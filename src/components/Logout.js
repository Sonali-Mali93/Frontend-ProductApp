import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove authentication token from local storage
    localStorage.removeItem('token');

    // Show SweetAlert success message
    Swal.fire({
      icon: 'success',
      title: 'Logout successful',
      text: 'You have successfully logged out!',
      timer: 4000 // Hide after 4 seconds
    }).then(() => {
      // Redirect the user to the login page
      navigate('/login');
    });
  };

  return (
    <button className="btn btn-primary ms-3" onClick={handleLogout}>Logout</button>
  );
}

export default Logout;
