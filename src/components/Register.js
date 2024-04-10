import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    // mobile: ''
  });
  const [message, setMessage] = useState('');

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
      const response = await axios.post('http://localhost:3001/register', formData);
      console.log(response.data); // You can handle the response here
      setMessage(response.data.message); // Set the message state
      // Show SweetAlert success message
      Swal.fire({
        icon: 'success',
        title: 'Registration successful',
        text: response.data.message,
        timer: 4000 // Hide after 4 seconds
      });
    } catch (error) {
      console.error('Error registering user:', error);
      // Show SweetAlert error message
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error registering user',
        timer: 4000 // Hide after 4 seconds
      });
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-6">
          <div className="border rounded p-4 shadow">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username:</label>
                <input type="text" className="form-control" id="username" name="username" value={formData.username} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password:</label>
                <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} />
              </div>
              {/* <div className="mb-3">
                <label htmlFor="mobile" className="form-label">Mobile:</label>
                <input type="text" className="form-control" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} />
              </div> */}
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            {message && <div className="alert alert-success mt-3">{message}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
