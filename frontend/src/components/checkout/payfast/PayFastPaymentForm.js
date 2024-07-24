import React from 'react';

const PayFastPaymentForm = () => {
  const handlePayment = () => {
    const paymentData = {
      merchant_id: 'your-merchant-id', // get when you sign up to PayFast
      merchant_key: 'your-merchant-key', // get when you sign up to PayFast
      return_url: 'https://your-website.com/success',
      cancel_url: 'https://your-website.com/cancel',
      notify_url: 'https://your-website.com/notify',
      name_first: 'John',
      name_last: 'Doe',
      email_address: 'john.doe@example.com',
      amount: '1000.00', // Amount in cents
      item_name: 'Product Name', // Order Number
    };

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://www.payfast.co.za/eng/process';

    Object.keys(paymentData).forEach((key) => {
      const hiddenField = document.createElement('input');
      hiddenField.type = 'hidden';
      hiddenField.name = key;
      hiddenField.value = paymentData[key];
      form.appendChild(hiddenField);
    });

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <button onClick={handlePayment}>Pay with PayFast</button>
  );
};

export default PayFastPaymentForm;