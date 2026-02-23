import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";

function CartItem() {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  // ✅ Separate function (IMPORTANT)
  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return (
    <div>
      <h2>Shopping Cart</h2>

      {cart.map(item => (
        <div key={item.id}>
          <img src="https://via.placeholder.com/100" alt={item.name} />

          <p>{item.name}</p>
          <p>₹{item.price}</p>

          <input
            type="number"
            value={item.quantity}
            min="1"
            onChange={(e) =>
              dispatch(updateQuantity({
                id: item.id,
                quantity: Number(e.target.value)
              }))
            }
          />

          <button onClick={() => dispatch(removeItem(item.id))}>
            Remove
          </button>

          {/* ✅ per item total */}
          <p>Total: ₹{item.price * item.quantity}</p>
        </div>
      ))}

      {/* ✅ total using function */}
      <h3>Grand Total: ₹{calculateTotal()}</h3>
    </div>
  );
}

export default CartItem;
