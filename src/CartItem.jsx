import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem({ name: item.name }));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem({ name: item.name }));
  };

  const calculateTotalCost = (item) => {
    return (item.price * item.quantity).toFixed(2);
  };

  const handleCheckoutShopping = (e) => {
    e.preventDefault();
    alert('Checkout functionality will be added later');
  };

  return (
    <div className="cart-container" style={{ padding: '20px' }}>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <h3 style={{ color: 'black' }}>
            Total Cart Amount: ${calculateTotalAmount()}
          </h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cartItems.map((item) => (
              <li
                key={item.name}
                className="cart-item"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '20px',
                  border: '1px solid #ddd',
                  padding: '10px',
                  borderRadius: '8px',
                  backgroundColor: '#f9f9f9',
                }}
              >
                <img
                  src={
                    item.image ||
                    'https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg'
                  }
                  alt={item.name}
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    marginRight: '15px',
                  }}
                />
                <div>
                  <h3 style={{ margin: '0 0 10px 0' }}>{item.name}</h3>
                  <p style={{ margin: 0 }}>
                    Unit Price: ${item.price.toFixed(2)}
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      margin: '10px 0',
                      gap: '10px',
                    }}
                  >
                    <button
                      aria-label={`Decrease quantity of ${item.name}`}
                      onClick={() => handleDecrement(item)}
                      disabled={item.quantity === 1}
                      style={{
                        width: '30px',
                        height: '30px',
                        fontSize: '18px',
                        cursor: item.quantity === 1 ? 'not-allowed' : 'pointer',
                      }}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      aria-label={`Increase quantity of ${item.name}`}
                      onClick={() => handleIncrement(item)}
                      style={{
                        width: '30px',
                        height: '30px',
                        fontSize: '18px',
                        cursor: 'pointer',
                      }}
                    >
                      +
                    </button>
                  </div>
                  <p>Total: ${calculateTotalCost(item)}</p>
                  <button
                    onClick={() => handleRemove(item)}
                    aria-label={`Remove ${item.name} from cart`}
                    style={{
                      backgroundColor: '#e74c3c',
                      color: 'white',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: '20px' }}>
            <button
              onClick={onContinueShopping}
              style={{
                padding: '10px 20px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '16px',
                cursor: 'pointer',
                marginRight: '10px',
              }}
            >
              Continue Shopping
            </button>
            <button
              onClick={handleCheckoutShopping}
              style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '16px',
                cursor: 'pointer',
              }}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItem;
