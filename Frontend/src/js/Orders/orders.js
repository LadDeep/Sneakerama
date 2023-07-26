import React, { useState, useEffect } from 'react';
import '../../css/Orders.css';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

function Orders() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          'http://localhost:3001/product/?ids=64c0800fdb2ebe7d302ae827,64c08082db2ebe7d302ae828'
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const renderProducts = () => {
    if (products.length === 0)
      return (
        <div style={{ color: '#959595', fontSize: '18px', textAlign: 'center', marginTop: '20px' }}>
          You don’t have any items.
        </div>
      );

    return products.map((product, index) => {
      return (
        <div className="product-item" key={index}>
          <div className="product-image">
            <img src={product.image[0]} alt="Product" className="product-list-image" />
          </div>
          <div className="product-details">
            <div className="product-model">{product.model}</div>
            <div className="product-size">Size: {product.size}</div>
            <div className="product-price">${parseInt(product.price).toFixed(2)}</div>
          </div>
        </div>
      );
    });
  };

  return (
    <>
    <Header />
    <div className="orders-container">
      <h2 className="orders-title">Your Orders</h2>
      <div className="products-container">{renderProducts()}</div>
    </div>
    <Footer />
    </>
  );
}

export default Orders;
