import React from 'react';

const SummaryCheckout = ({ products, vatRate }) => {
  const calculateTotal = () => {
    const subtotal = products.reduce((acc, product) => acc + product.price * product.quantity, 0);
    const vat = subtotal * vatRate;
    const total = subtotal + vat;
    return { subtotal, vat, total };
  };

  const { subtotal, vat, total } = calculateTotal();

  return (
    <div className="checkout">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <div className="flex justify-between mb-2">
        <span>Subtotal:</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>VAT ({(vatRate * 100).toFixed(2)}%):</span>
        <span>${vat.toFixed(2)}</span>
      </div>
      <div className="flex justify-between font-bold text-lg mb-2">
        <span>Total:</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <button className="bg-blue-500 text-white py-2 px-4 rounded">Proceed to Payment</button>
    </div>
  );
};

export default SummaryCheckout;