/*Dhruv Kothari*/

import React, { useState, useEffect } from 'react';
import '../../css/Orders.css';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import { getOrders } from '../../services/orders';
import { useNavigate } from 'react-router-dom';
import { backendURL } from '../../constants';
import { dateFormatOptions } from '../../constants';
  
function Orders() {
    const [intitalOrders, setInitialOrders] = useState([]);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
          try {
            const ordersList = await getOrders();
            console.log(ordersList, "orderList");
            setInitialOrders(ordersList.response);
          } catch (error) {
            console.error('Error fetching orders:', error);
          }
        };
      
        fetchOrders();
      }, []);
      
      useEffect(() => {
        const fetchProducts = async () => {
          try {
            setOrders([]);
      
            const orderPromises = intitalOrders.map(async (order) => {
              const ids = order.orderItems.join(',');
              console.log(ids,"ids")
              const response = await fetch(`${backendURL}/product/?ids=${ids}`);
              const data = await response.json();
              console.log(data, "data");
              console.log(order.total, "total");
              console.log(order.quantities,"quantities")
        
              return {
                date: order.createdAt,
                total: order.total,
                orderItems: data,
                selleremail:order.email,
                quantities:order.quantities
              };
            });
            
            const fetchedOrders = await Promise.all(orderPromises);
            setOrders(fetchedOrders);
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        };
      
        if (intitalOrders.length > 0) {
          fetchProducts();
        }
      }, [intitalOrders]);
      

    const renderOrders = () => {
        console.log("orders",orders)
        const sortedOrders = orders.sort((a, b) => new Date(b.date) - new Date(a.date));

        return sortedOrders.map((order, index) => {
            return (
              <div
                className="order-item"
                key={index}
                onClick={() =>
                  navigate(`/orders/${index}`, {
                    state: {
                      orderDetails: order.orderItems,
                      date: new Date(order.date).toLocaleString(
                        "en-US",
                        dateFormatOptions
                      ),
                      total: order.total,
                      quantity:order.quantities
                    },
                  })
                }
              >
                <div className="order-card-container">
                  <div className="order-image">
                    <img src={order?.orderItems[0]?.image[0]} alt='' />
                  </div>

                  <div className="order-details">
                    <div className="order-title">
                      {order?.orderItems[0]?.model}
                    </div>
                    <div className="product-model">
                      +{order?.orderItems.length - 1} more
                    </div>
                  </div>
                  <div className="order-price">
                    ${parseInt(order?.total).toFixed(2)}
                  </div>
                </div>
                <p className="order-delivery-info">
                  Ordered on:{" "}
                  {new Date(order?.date).toLocaleString("en-US", dateFormatOptions)}
                </p>
              </div>
            );
        });
    };

    // const renderProducts = (products) => {
    //     console.log("products",products)
    //     return products.map((product, index) => {
    //         return (
    //             <>
    //                 <div className="order-image">
    //                     <img src={product.image[0]} alt="Product" className="product-list-image" />
    //                 </div>
    //                 <div className="product-details">
    //                     <div className="product-model">{product.model}</div>
    //                     <div className="product-price">${parseInt(product.price).toFixed(2)}</div>
    //                 </div>
    //             </>
    //         )
    //     })
    // }

    return (
        <>
            <Header />
            <div className="orders-container">
                <h2 className="orders-title">Your Orders</h2>
                <div className="products-container">
                    {
                        orders.length === 0
                            ?
                            <div style={{ color: '#959595', fontSize: '18px', minHeight: '80vh', textAlign: 'center', marginTop: '20px' }}>
                                You don’t have any orders.
                            </div>
                            :
                            <>
                                <h2>Your Orders</h2>
                                {renderOrders()}
                            </>
                    }
                    {/* <p>Your order has been places successfully. <span className='products-span' onClick={() => navigate('/home')}>Continue Shopping.</span></p> */}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Orders;
