import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(100);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/products');
      const data = await response.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = products.slice(firstIndex, lastIndex);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleAddToCart = (product) => {
    console.log(`${product.name} added to cart!`);
  };

  return (
    <div>
      <h1><img src='https://imagedelivery.net/LqiWLm-3MGbYHtFuUbcBtA/b7f32082-3539-4c9b-fc40-168308e1c200/public' /></h1>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="product-list">
          {currentItems.length > 0 ? (
            currentItems.map((product) => (
              <div key={product._id} className="product-card">
                <img src={product.url} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>{`Rs ${product.price}`}</p>
                <p>{product.category}</p>
                <button
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default App;
