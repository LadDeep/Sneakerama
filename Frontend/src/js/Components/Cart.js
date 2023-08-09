import { CloseOutlined } from '@ant-design/icons';
import '../../css/Cart.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Cart(props) {

    const navigate = useNavigate();
    const [products, setProducts] = useState(JSON.parse(localStorage.getItem('cart')));
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
                            <img src={product.image[0]} alt="Product" className='cart-list-image' />
                        </div>
                        <div style={{ color: "#959595", marginLeft: '10px' }}>
                            <div className="cart-item-details">
                                <div style={{ marginBottom: '5px' }}>
                                    {product.model}
                                </div>
                                <div style={{ marginBottom: '5px' }}>
                                    Size: {product.size}
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
                                                localStorage.setItem('cart', JSON.stringify(tempProducts));
                                            }
                                        }
                                        }
                                    >-</span>
                                    <span className="quantity-value">{product.quantity}</span>
                                    <span className="quantity-btn"
                                        onClick={async () => {
                                            const stringQuantity = tempProducts[index].quantity;
                                            tempProducts[index].quantity = parseInt(stringQuantity) + 1;
                                            await setProducts(tempProducts);
                                            localStorage.setItem('cart', JSON.stringify(tempProducts));
                                        }
                                        }
                                    >+</span>
                                </div>
                            </div>
                            <div onClick={async () => {
                                tempProducts = await tempProducts.filter((item, count) => count !== index);
                                console.log(tempProducts);
                                await setProducts(tempProducts);
                                localStorage.setItem('cart', JSON.stringify(tempProducts));
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
                <CloseOutlined className='reviews-modal-close-btn' onClick={() => {
                    document.body.style.overflowY = 'scroll'
                    props.setIsCartOpen(false);
                }} />
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
                                    navigate('/payment');
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
