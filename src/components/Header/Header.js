import './Header.css';

function Header({ searchQuery, onSearchChange, cartItemCount, onCartClick }) {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">🛍️ Betterway</h1>
        
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>

        <button className="cart-button" onClick={onCartClick}>
          🛒 Cart
          {cartItemCount > 0 && (
            <span className="cart-badge">{cartItemCount}</span>
          )}
        </button>
      </div>
    </header>
  );
}

export default Header;