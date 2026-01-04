import './Cart.css';

function Cart({ isOpen, onClose, cart, cartTotal, onRemove, onUpdateQuantity }) {
  if (!isOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={onClose}></div>
      <div className="cart-sidebar">
        <div className="cart-header">
          <h2>Shopping Cart ({cart.length})</h2>
          <button onClick={onClose} className="close-btn">✕</button>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <span className="empty-icon">🛒</span>
            <p>Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  
                  <div className="cart-item-details">
                    <h4>{item.name}</h4>
                    <p className="cart-item-price">${item.price}</p>
                    
                    <div className="quantity-controls">
                      <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>
                        +
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-actions">
                    <p className="item-total">${(item.price * item.quantity).toFixed(2)}</p>
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="remove-btn"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-total">
                <span>Total:</span>
                <span className="total-amount">${cartTotal.toFixed(2)}</span>
              </div>
              <button className="checkout-btn">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Cart;