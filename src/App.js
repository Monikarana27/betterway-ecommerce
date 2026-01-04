import { useState, useMemo, useCallback } from 'react';
import './App.css';
import { products as initialProducts } from './data/products';
import Header from './components/Header/Header';
import Filters from './components/Filters/Filters';
import ProductList from './components/ProductList/ProductList';
import Cart from './components/Cart/Cart';

function App() {
  // Core state
  const [products] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name-asc');
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0,
    maxPrice: 500,
    minRating: 0
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Derived state - filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = filters.category === 'all' || p.category === filters.category;
        const matchesPrice = p.price >= filters.minPrice && p.price <= filters.maxPrice;
        const matchesRating = p.rating >= filters.minRating;
        return matchesSearch && matchesCategory && matchesPrice && matchesRating;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating-desc') return b.rating - a.rating;
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        return 0;
      });
  }, [products, searchQuery, filters, sortBy]);

  // Cart operations
  const addToCart = useCallback((product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="App">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartItemCount={cartItemCount}
        onCartClick={() => setIsCartOpen(true)}
      />

      <div className="main-container">
        <Filters
          filters={filters}
          onFilterChange={setFilters}
        />

        <div className="content">
          <div className="sort-bar">
            <span>{filteredProducts.length} products found</span>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="name-asc">Name (A-Z)</option>
              <option value="price-asc">Price (Low to High)</option>
              <option value="price-desc">Price (High to Low)</option>
              <option value="rating-desc">Rating (High to Low)</option>
            </select>
          </div>

          <ProductList
            products={filteredProducts}
            onAddToCart={addToCart}
          />
        </div>
      </div>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        cartTotal={cartTotal}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />
    </div>
  );
}

export default App;