import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', formData);
      console.log(response.data); // You can handle the response here
      // Optionally, you can save the token in local storage or session storage
      localStorage.setItem('token', response.data.token);
      // Redirect the user to the product page upon successful login
      navigate('/product');
      // Show SweetAlert success message
      Swal.fire({
        icon: 'success',
        title: 'Login successful',
        text: 'You have successfully logged in!',
        timer: 4000 // Hide after 4 seconds
      });
    } catch (error) {
      console.error('Error logging in:', error.response.data.error);
      // Show SweetAlert error message
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data.error,
        timer: 4000 // Hide after 4 seconds
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="d-flex">
        <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" className="form-control me-2" />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="form-control me-2" />
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

export default Login;
