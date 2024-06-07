import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear the error when the input changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    
    if (!formData.email) {
      newErrors = { ...newErrors, email: 'Email is required' };
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors = { ...newErrors, email: 'Email is invalid' };
    }
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        const response = await axios.post('http://localhost:4000/contact', formData);
        if (response.status === 200) {
          console.log('Form submitted successfully');
          setFormData({ name: '', email: '', message: '' });
          setIsSubmitted(true);
        } else {
          console.error('Form submission failed');
          setErrors({ ...errors, submission: 'Form submission failed. Please try again later.' });
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setErrors({ ...errors, submission: 'An unexpected error occurred. Please try again later.' });
      }
    }
  };

  return (
    <>
      <h1 className="text-4xl text-center text-gray-800 font-bold mb-8">Contact Us</h1>
      <div className="w-full">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="mt-1 p-2 block w-full border rounded-md focus:outline-none border-gray-300"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className={`mt-1 p-2 block w-full border rounded-md focus:outline-none ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>} 
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              className="mt-1 p-2 block w-full border rounded-md focus:outline-none border-gray-300"
              rows={4}
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
        <div className="flex items-center justify-center mt-4">
          {isSubmitted && <p className="text-green-500">Your form has been submitted.</p>}
          {errors.submission && <p className="text-red-500">{errors.submission}</p>}
        </div>
      </div>
    </>
  );
};

export default ContactForm; // JavaScript's Export Module

// REACT CONCEPTS:
  // Reconciliation -> shallow comparison between pre and new state to determine if it needs to re-render\
  // Immuntability -> create new object with updated properties, rather than direct mutation of existing object.
  // Direct Mutation -> React may not detect the change and will not re-render

  //handleInputChange function
    // Synthetic Event Object - created when an event occurs in a component (React Functionality) 
    // onChange --> creates e
    // SyntheticEvent Object (e) has a property target. The input is passed in as a argument into e, and the target property is updated.
    // e.target = <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className="mt-1 p-2 block w-96 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"/>
    // It is important to note that the object { ...formData, [name]: value } contains 2 separate operations.
    // 1st: ...formData is spread syntax that makes a shallow copy of the form Data object.
    // 2nd: The shallow copy gets updated with the changed value for the specific input
    // the setFormData then sets the State to the updated formData. 

  //handleSubmit
    // preventDefault -> method available on event objects (e), preventing the browser's default action of submitting and refresing page
    // e.preventDefault -> sets the property of e.defaultPrevented to True.
    // Most events normally have a preventDefault method.