import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert

function Product() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [message, setMessage] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch all products when the component mounts
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3001/product', {
        headers: {
          'x-api-token': token
        }
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

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
      const token = localStorage.getItem('token');
      let response;
      if (editMode) {
        response = await axios.put(`http://localhost:3001/product/${editProductId}`, formData, {
          headers: {
            'x-api-token': token
          }
        });
      } else {
        response = await axios.post('http://localhost:3001/product', formData, {
          headers: {
            'x-api-token': token
          }
        });
      }
      console.log(response.data); // You can handle the response here
      setMessage(response.data.message); // Set the message state
      // Clear the form after successful submission
      setFormData({ name: '', description: '', price: '' });
      setEditMode(false); // Reset edit mode after submission
      // Show SweetAlert success message
      Swal.fire({
        icon: 'success',
        title: 'Product added successfully',
        text: response.data.message,
        timer: 4000 // Hide after 4 seconds
      });
      // Fetch products again after adding/updating a product
      fetchProducts();
    } catch (error) {
      console.error('Error adding/updating product:', error.response.data.error);
      // Show SweetAlert error message
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response.data.error,
        timer: 4000 // Hide after 4 seconds
      });
    }
  };

  const handleEdit = (id) => {
    // Find the product to edit by its ID
    const productToEdit = products.find(product => product._id === id);
    // Set the form data to the existing values of the product
    setFormData({
      name: productToEdit.name,
      description: productToEdit.description,
      price: productToEdit.price
    });
    setEditMode(true); // Set edit mode to true
    setEditProductId(id); // Set the ID of the product being edited
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`http://localhost:3001/product/${id}`, {
        headers: {
          'x-api-token': token
        }
      });
      console.log(response.data); // You can handle the response here
      setMessage(response.data.message); // Set the message state
      // Show SweetAlert success message
      Swal.fire({
        icon: 'success',
        title: 'Product deleted successfully',
        text: response.data.message,
        timer: 4000 // Hide after 4 seconds
      });
      // Fetch products again after deleting a product
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error.response.data.error);
      // Show SweetAlert error message
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response.data.error,
        timer: 4000 // Hide after 4 seconds
      });
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-6">
          <div className="border rounded p-4 shadow">
            <h2>{editMode ? 'Update Product' : 'Add Product'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Product Name:</label>
                <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description:</label>
                <input type="text" className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">Price:</label>
                <input type="text" className="form-control" id="price" name="price" value={formData.price} onChange={handleChange} />
              </div>
              <button type="submit" className="btn btn-primary">
                {editMode ? 'Update Product' : 'Add Product'}
              </button>
            </form>
            {message && <div className="alert alert-success mt-3">{message}</div>}
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col">
          <h2>Products</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>
                    <button className="btn btn-primary me-2" onClick={() => handleEdit(product._id)}>Edit</button>
                    <button className="btn btn-danger me-2" onClick={() => handleDelete(product._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default Product;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2'; // Import SweetAlert

// function Product() {
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     price: ''
//   });
//   const [editMode, setEditMode] = useState(false);
//   const [editProductId, setEditProductId] = useState(null);
//   const [message, setMessage] = useState('');
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     // Fetch all products when the component mounts
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:3001/product', {
//         headers: {
//           'x-api-token': token
//         }
//       });
//       setProducts(response.data);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       let response;
//       if (editMode) {
//         response = await axios.put(`http://localhost:3001/product/${editProductId}`, formData, {
//           headers: {
//             'x-api-token': token
//           }
//         });
//       } else {
//         response = await axios.post('http://localhost:3001/product', formData, {
//           headers: {
//             'x-api-token': token
//           }
//         });
//       }
//       console.log(response.data); // You can handle the response here
//       setMessage(response.data.message); // Set the message state
//       // Clear the form after successful submission
//       setFormData({ name: '', description: '', price: '' });
//       setEditMode(false); // Reset edit mode after submission
//       // Show SweetAlert success message
//       Swal.fire({
//         icon: 'success',
//         title: 'Product added successfully',
//         text: response.data.message,
//         timer: 4000 // Hide after 4 seconds
//       });
//       // Fetch products again after adding/updating a product
//       fetchProducts();
//     } catch (error) {
//       console.error('Error adding/updating product:', error.response.data.error);
//       // Show SweetAlert error message
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: error.response.data.error,
//         timer: 4000 // Hide after 4 seconds
//       });
//     }
//   };

//   const handleEdit = (id) => {
//     // Find the product to edit by its ID
//     const productToEdit = products.find(product => product._id === id);
//     // Set the form data to the existing values of the product
//     setFormData({
//       name: productToEdit.name,
//       description: productToEdit.description,
//       price: productToEdit.price
//     });
//     setEditMode(true); // Set edit mode to true
//     setEditProductId(id); // Set the ID of the product being edited
//   };

//   const handleDelete = (id) => {
//     // Handle delete action here
//     console.log(`Delete product with id ${id}`);
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-6">
//           <div className="border rounded p-4 shadow">
//             <h2>{editMode ? 'Update Product' : 'Add Product'}</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-3">
//                 <label htmlFor="name" className="form-label">Product Name:</label>
//                 <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="description" className="form-label">Description:</label>
//                 <input type="text" className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="price" className="form-label">Price:</label>
//                 <input type="text" className="form-control" id="price" name="price" value={formData.price} onChange={handleChange} />
//               </div>
//               <button type="submit" className="btn btn-primary">
//                 {editMode ? 'Update Product' : 'Add Product'}
//               </button>
//             </form>
//             {message && <div className="alert alert-success mt-3">{message}</div>}
//           </div>
//         </div>
//       </div>

//       <div className="row mt-5">
//         <div className="col">
//           <h2>Products</h2>
//           <table className="table">
//             <thead>
//               <tr>
//                 <th>Product Name</th>
//                 <th>Description</th>
//                 <th>Price</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.map(product => (
//                 <tr key={product._id}>
//                   <td>{product.name}</td>
//                   <td>{product.description}</td>
//                   <td>{product.price}</td>
//                   <td>
//                     <button className="btn btn-primary me-2" onClick={() => handleEdit(product._id)}>Edit</button>
//                     <button className="btn btn-danger me-2" onClick={() => handleDelete(product._id)}>Delete</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//     </div>
//   );
// }

// export default Product;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2'; // Import SweetAlert

// function Product() {
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     price: ''
//   });

//   const [message, setMessage] = useState('');
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     // Fetch all products when the component mounts
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:3001/product', {
//         headers: {
//           'x-api-token': token
//         }
//       });
//       setProducts(response.data);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.post('http://localhost:3001/product', formData, {
//         headers: {
//           'x-api-token': token
//         }
//       });
//       console.log(response.data); // You can handle the response here
//       setMessage(response.data.message); // Set the message state
//       // Clear the form after successful submission
//       setFormData({ name: '', description: '', price: '' });
//       // Show SweetAlert success message
//       Swal.fire({
//         icon: 'success',
//         title: 'Product added successfully',
//         text: response.data.message,
//         timer: 4000 // Hide after 4 seconds
//       });
//       // Fetch products again after adding a new product
//       fetchProducts();
//     } catch (error) {
//       console.error('Error adding product:', error.response.data.error);
//       // Show SweetAlert error message
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: error.response.data.error,
//         timer: 4000 // Hide after 4 seconds
//       });
//     }
//   };

//   const handleEdit = (id) => {
//     // Find the product with the given ID
//     const productToEdit = products.find(product => product._id === id);
//     // Populate form fields with existing values
//     setFormData({
//       name: productToEdit.name,
//       description: productToEdit.description,
//       price: productToEdit.price
//     });
//     // Change button text to "Update Product"
//     document.getElementById('submitButton').innerText = 'Update Product';
//   };

//   const handleDelete = (id) => {
//     // Handle delete action here
//     console.log(`Delete product with id ${id}`);
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-6">
//           <div className="border rounded p-4 shadow">
//             <h2>Add Product</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-3">
//                 <label htmlFor="name" className="form-label">Product Name:</label>
//                 <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="description" className="form-label">Description:</label>
//                 <input type="text" className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="price" className="form-label">Price:</label>
//                 <input type="text" className="form-control" id="price" name="price" value={formData.price} onChange={handleChange} />
//               </div>
//               <button id="submitButton" type="submit" className="btn btn-primary">Add Product</button>
//             </form>
//             {message && <div className="alert alert-success mt-3">{message}</div>}
//           </div>
//         </div>
//       </div>

//       <div className="row mt-5">
//         <div className="col">
//           <h2>Products</h2>
//           <table className="table">
//             <thead>
//               <tr>
//                 <th>Product Name</th>
//                 <th>Description</th>
//                 <th>Price</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.map(product => (
//                 <tr key={product._id}>
//                   <td>{product.name}</td>
//                   <td>{product.description}</td>
//                   <td>{product.price}</td>
//                   <td>
//                     <button className="btn btn-primary me-2" onClick={() => handleEdit(product._id)}>Edit</button>
//                     <button className="btn btn-danger me-2" onClick={() => handleDelete(product._id)}>Delete</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Product;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2'; // Import SweetAlert

// function Product() {
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     price: ''
//   });

//   const [message, setMessage] = useState('');
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     // Fetch all products when the component mounts
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:3001/product', {
//         headers: {
//           'x-api-token': token
//         }
//       });
//       setProducts(response.data);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.post('http://localhost:3001/product', formData, {
//         headers: {
//           'x-api-token': token
//         }
//       });
//       console.log(response.data); // You can handle the response here
//       setMessage(response.data.message); // Set the message state
//       // Clear the form after successful submission
//       setFormData({ name: '', description: '', price: '' });
//       // Show SweetAlert success message
//       Swal.fire({
//         icon: 'success',
//         title: 'Product added successfully',
//         text: response.data.message,
//         timer: 4000 // Hide after 4 seconds
//       });
//       // Fetch products again after adding a new product
//       fetchProducts();
//     } catch (error) {
//       console.error('Error adding product:', error.response.data.error);
//       // Show SweetAlert error message
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: error.response.data.error,
//         timer: 4000 // Hide after 4 seconds
//       });
//     }
//   };

//   const handleEdit = (id) => {
//     // Handle edit action here
//     console.log(`Edit product with id ${id}`);
//   };

//   const handleDelete = (id) => {
//     // Handle delete action here
//     console.log(`Delete product with id ${id}`);
//   };

  

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-6">
//           <div className="border rounded p-4 shadow">
//             <h2>Add Product</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-3">
//                 <label htmlFor="name" className="form-label">Product Name:</label>
//                 <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="description" className="form-label">Description:</label>
//                 <input type="text" className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="price" className="form-label">Price:</label>
//                 <input type="text" className="form-control" id="price" name="price" value={formData.price} onChange={handleChange} />
//               </div>
//               <button type="submit" className="btn btn-primary">Add Product</button>
//             </form>
//             {message && <div className="alert alert-success mt-3">{message}</div>}
//           </div>
//         </div>
//       </div>

//       <div className="row mt-5">
//   <div className="col">
//     <h2>Products</h2>
//     <table className="table">
//       <thead>
//         <tr>
//           <th>Product Name</th>
//           <th>Description</th>
//           <th>Price</th>
//           <th>Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {products.map(product => (
//           <tr key={product._id}>
//             <td>{product.name}</td>
//             <td>{product.description}</td>
//             <td>{product.price}</td>
//             <td>
//               <button className="btn btn-primary me-2" onClick={() => handleEdit(product._id)}>Edit</button>
//               <button className="btn btn-danger me-2" onClick={() => handleDelete(product._id)}>Delete</button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// </div>

//     </div>
//   );
// }

// export default Product;


// import React from 'react';

// function Product() {
//   const products = [
//     { id: 1, name: 'Product 1', description: 'Description 1', price: '$10' },
//     { id: 2, name: 'Product 2', description: 'Description 2', price: '$20' },
//     { id: 3, name: 'Product 3', description: 'Description 3', price: '$30' }
//   ];

//   const handleEdit = (id) => {
//     // Handle edit action here
//     console.log(`Edit product with id ${id}`);
//   };

//   const handleDelete = (id) => {
//     // Handle delete action here
//     console.log(`Delete product with id ${id}`);
//   };

//   const handleDetails = (id) => {
//     // Handle details action here
//     console.log(`Get details of product with id ${id}`);
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Products</h2>
//       <table className="table">
//         <thead>
//           <tr>
//             <th>Product Name</th>
//             <th>Description</th>
//             <th>Price</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map(product => (
//             <tr key={product.id}>
//               <td>{product.name}</td>
//               <td>{product.description}</td>
//               <td>{product.price}</td>
//               <td>
//                 <button className="btn btn-primary me-2" onClick={() => handleEdit(product.id)}>Edit</button>
//                 <button className="btn btn-danger me-2" onClick={() => handleDelete(product.id)}>Delete</button>
//                 <button className="btn btn-info" onClick={() => handleDetails(product.id)}>Details</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Product;
