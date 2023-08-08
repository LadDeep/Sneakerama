import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "../../css/OrderDetails.css";

const OrderDetails = () => {
  const location = useLocation();
  const { orderDetails, date, total,quantity} = location.state;
  console.log(quantity)
  return (
    <>
      <Header />
      {/* <div className="order-summary-conainter"> */}
        <div
        className="order-summary" 
        >
          <h2>Order Summary</h2>
          <p className="order-delivery-date">Ordered on: {date}</p>
          <hr className="horizontal-bar"/>

          {orderDetails.map((product, index) => (
            <div className="product-card-container">
              <div className="order-image" key={index}>
                <img
                  src={product.image[0]}
                  alt="Product"
                />
              </div>
              <div className="product-details">
                <div className="product-model">{product.model}</div>
                <div className="product-quantity">Quantity: {quantity[index]}</div>
                <div className="product-quantity">Seller Name: {product.email}</div>

              </div>
              <div className="product-price">
                ${parseInt(product.price).toFixed(2)*quantity[index]}
              </div>
            </div>
          ))}
          <hr className="horizontal-bar"/>
          <div className="order-price">Total ${parseInt(total).toFixed(2)}</div>
        </div>
      {/* </div> */}
      <Footer />
    </>
  );
};

export default OrderDetails;
