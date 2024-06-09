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

  const handlePayment = (event) => {
    event.preventDefault();
    // Add your payment processing logic here.
    setModalIsOpen(false);
  };

  return (
    <div className="checkout">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <div className="flex justify-between mb-2">
        <span>Subtotal:</span>
        <span>R{subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>VAT ({(vatRate * 100).toFixed(2)}%):</span>
        <span>R{vat.toFixed(2)}</span>
      </div>
      <div className="flex justify-between font-bold text-lg mb-2">
        <span>Total:</span>
        <span>R{total.toFixed(2)}</span>
      </div>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded"
        onClick={() => setModalIsOpen(true)}
      >
        Proceed to Payment
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