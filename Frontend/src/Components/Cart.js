import '../Styles/Cart.css';
import { useState } from 'react';

import image1 from '../Assets/jordan-air-1-mid-se.png';
import image2 from '../Assets/adidas-ultra-bounce.png';

function Cart(props) {

    const [products, setProducts] = useState([
        {
            name: 'Nike Dunk Low',
            price: '325',
            image: image1,
            quantity: 1
        },
        {
            name: 'Air Jordan 4 Retro',
            price: '375',
            image: image2,
            quantity: 1
        }
    ]);
    var total = 0;

    const renderProducts = () => {
        if (products.length === 0)
            return <div style={{ color: '#959595', fontSize: '18px', textAlign: 'center', marginTop: '20px' }}>You don’t have any items.</div>
        var tempProducts = [...products];
        return products.map((product, index) => {
            total += parseInt(product.price) * parseInt(product.quantity);
            return (
                <div className="cart-item" key={index}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className="cart-item-image">
                            <img src={product.image} alt="Product" className='cart-list-image' />
                        </div>
                        <div style={{ color: "#959595", marginLeft: '10px' }}>
                            <div className="cart-item-details">
                                <div style={{ marginBottom: '15px' }}>
                                    {product.name}
                                </div>
                                <div style={{ marginBottom: '15px', textAlign: 'start' }}>
                                    ${parseInt(product.price).toFixed(2)}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                                    <span className="quantity-btn"
                                        onClick={async () => {
                                            if (tempProducts[index].quantity > 1) {
                                                tempProducts[index].quantity -= 1;
                                                await setProducts(tempProducts);
                                            }
                                        }
                                        }
                                    >-</span>
                                    <span className="quantity-value">{product.quantity}</span>
                                    <span className="quantity-btn"
                                        onClick={async () => {
                                            tempProducts[index].quantity += 1;
                                            await setProducts(tempProducts);
                                        }
                                        }
                                    >+</span>
                                </div>
                            </div>
                            <div onClick={async () => {
                                tempProducts = await tempProducts.filter((item, count) => count !== index);
                                console.log(tempProducts);
                                await setProducts(tempProducts);
                            }} className="cart-item-remove">
                                Remove item
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (
        <div style={{ position: 'fixed', top: '0px', width: '100%', zIndex: '9999' }} >
            <div className='cart-background' onClick={() => {
                props.setIsCartOpen(false);
                document.body.style.overflowY = 'scroll'
            }}>
            </div>
            <div className='cart-container'
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <h2 style={{ textAlign: 'center', textTransform: 'uppercase', borderBottom: '1px solid #f2f2f2', paddingBottom: '20px', marginInline: '15px' }}>Your Cart</h2>
                {renderProducts()}
                {
                    products.length === 0
                        ? null
                        :
                        <>
                            <div className="cart-total">
                                <div>
                                    Total
                                </div>
                                <div>
                                    ${total.toFixed(2)}
                                </div>
                            </div>
                            <div style={{ color: '#959595', textAlign: 'center', fontSize: '13px', marginTop: '10px' }}>
                                Shipping & taxes calculated at checkout
                            </div>
                            <div className='selected-btn' style={{ marginInline: '15px', textAlign: 'center', marginTop: '10px' }}
                                onClick={() => {
                                    props.setIsCartOpen(false);
                                    document.body.style.overflowY = 'scroll'
                                }}
                            >
                                Checkout
                            </div>
                            <div className="cart-item-remove continue-shopping" onClick={() => {
                                props.setIsCartOpen(false);
                                document.body.style.overflowY = 'scroll'
                            }}>
                                continue shopping
                            </div>
                        </>
                }
            </div>
        </div>
    );
}

export default Cart;
