import React, { useEffect } from 'react';

const PaymentModal = ({ isOpen, onRequestClose, total, handlePayment }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
        <form onSubmit={handlePayment}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              name="first_name"
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="last_name"
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phone"
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Message</label>
            <textarea
              name="message"
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Amount</label>
            <input
              type="text"
              name="amount"
              value={`R${total.toFixed(2)}`}
              className="p-2 border border-gray-300 rounded w-full"
              readOnly
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Pay Now
            </button>
            <button
              type="button"
              onClick={onRequestClose}
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;