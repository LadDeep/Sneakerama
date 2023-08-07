/*Dhruv Kothari*/

import React, { useState, useEffect } from 'react';
import '../../css/Orders.css';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import { getOrders } from '../../services/orders';
import { useNavigate } from 'react-router-dom';

function Orders() {
    const [intitalOrders, setInitialOrders] = useState([]);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        const fetchOrders = async () => {
            try {
                const ordersList = await getOrders();
                console.log(ordersList,"orderList")
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
                await intitalOrders.forEach(async order => {
                    const ids = order.orderItems.join(',');
                    const response = await fetch(
                        'http://localhost:3001/product/?ids=' + ids
                    );
                    const data = await response.json();
                    console.log(data,"data");
                    const savedOrders = orders;
                    await savedOrders.push({
                        date: order.createdAt,
                        total: order.total,
                        orderItems: data
                    })
                    await setOrders(savedOrders);
                })
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
        // eslint-disable-next-line
    }, [intitalOrders]);

    const renderOrders = () => {
        console.log(orders)
        return orders.map((order, index) => {
            return (
                <div className="order-item" key={index}>
                    {renderProducts(order.orderItems)}
                </div>
            );
        });
    };

    const renderProducts = (products) => {
        return products.map((product, index) => {
            return (
                <>
                    <div className="order-image">
                        <img src={product.image[0]} alt="Product" className="product-list-image" />
                    </div>
                    <div className="product-details">
                        <div className="product-model">{product.model}</div>
                        <div className="product-price">${parseInt(product.price).toFixed(2)}</div>
                    </div>
                </>
            )
        })
    }

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
