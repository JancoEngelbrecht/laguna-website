import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
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

    if (!formData.name) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(formData.phone)) { // Assuming phone number should be 10 digits
      newErrors.phone = 'Phone is invalid';
    }

    if (!formData.message) {
      newErrors.message = 'Message is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response1 = await axios.post(`${process.env.REACT_APP_API_URL}/contact`, formData);
      const response2 = await axios.post(`${process.env.REACT_APP_API_URL}/api/contactus`, formData);

      if (response1.status === 200 && response2.status === 200) {
        console.log('Form submitted successfully');
        setFormData({ name: '', email: '', phone: '', message: '' });
        setIsSubmitted(true);
      } else {
        console.error('Form submission failed');
        setErrors({ ...errors, submission: 'Form submission failed. Please try again later.' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ ...errors, submission: 'An unexpected error occurred. Please try again later.' });
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
            {errors.name && <p className="text-red-500">{errors.name}</p>} 
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
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone:
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className={`mt-1 p-2 block w-full border rounded-md focus:outline-none ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.phone && <p className="text-red-500">{errors.phone}</p>} 
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
            {errors.message && <p className="text-red-500">{errors.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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

export default ContactForm;