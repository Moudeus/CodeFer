import React from "react";
import { useCart } from "../contexts/CartContext";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalValue = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className="card">
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} style={{ margin: "10px 0" }}>
              <p>
                {item.name} - ${item.price} x {item.quantity}
              </p>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
          <p>Total Items: {totalItems}</p>
          <p>Total Value: ${totalValue}</p>
          <button onClick={clearCart}>Clear Cart</button>
        </>
      )}
    </div>
  );
};

export default Cart;
