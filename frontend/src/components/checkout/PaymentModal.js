import React from 'react';

const PaymentModal = ({ isOpen, onRequestClose, total, handlePayment }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
        <form onSubmit={handlePayment}>
          <div className="mb-4">
            <label className="block mb-2">First Name</label>
            <input type="text" name="first_name" className="p-2 border w-full" required />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Last Name</label>
            <input type="text" name="last_name" className="p-2 border w-full" required />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input type="email" name="email" className="p-2 border w-full" required />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Amount</label>
            <input type="text" name="amount" value={`R${total.toFixed(2)}`} className="p-2 border w-full" readOnly />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mr-2">Pay Now</button>
            <button type="button" onClick={onRequestClose} className="bg-gray-500 text-white py-2 px-4 rounded">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;