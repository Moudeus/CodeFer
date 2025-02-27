import React, { useState } from "react";

const OrderConfirmation = () => {
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const handleOrderConfirmation = () => {
    setOrderConfirmed(true);
    setTimeout(() => {
      setOrderConfirmed(false);
    }, 3000);
  };

  return (
    <div>
      <button onClick={handleOrderConfirmation}>Confirm Order</button>
      {orderConfirmed && <p>Order confirmed successfully!</p>}
    </div>
  );
};

export default OrderConfirmation;
