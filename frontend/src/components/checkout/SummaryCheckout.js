import React, { useState } from 'react';
import PaymentModal from './PaymentModal';

const SummaryCheckout = ({ products, vatRate }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const calculateTotal = () => {
    const subtotal = products.reduce((acc, product) => acc + product.price * product.quantity, 0);
    const vat = subtotal * vatRate;
    const total = subtotal + vat;
    return { subtotal, vat, total };
  };

  const { subtotal, vat, total } = calculateTotal();

  const handlePayment = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const orderData = {
      name: formData.get('first_name'),
      surname: formData.get('last_name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message'),
      products,
      total
    };

    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      const result = await response.json();
      if (response.ok) {
        alert('Order submitted successfully');
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit order');
    }

    setModalIsOpen(false);
  };

  return (
    <div className="checkout">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <div className="flex justify-between mb-2">
        <span>Subtotal:</span>
        <span>R {subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>VAT ({(vatRate * 100).toFixed(2)}%):</span>
        <span>R {vat.toFixed(2)}</span>
      </div>
      <div className="flex justify-between font-bold text-lg mb-2">
        <span>Total:</span>
        <span>R{total.toFixed(2)}</span>
      </div>
      <button
        className="bg-gray-500  hover:bg-black text-white py-2 px-4 rounded"
        onClick={() => setModalIsOpen(true)}
      >
        Submit Order
      </button>

      <PaymentModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        total={total}
        handlePayment={handlePayment}
      />
    </div>
  );
};

export default SummaryCheckout;