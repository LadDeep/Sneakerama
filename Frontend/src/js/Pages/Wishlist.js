import { useState } from 'react';
import { DeleteFilled } from '@ant-design/icons';
import { toast, ToastContainer } from 'react-toastify';

import Footer from '../Components/Footer';
import Header from '../Components/Header';
import '../../css/Wishlist.css';
import 'react-toastify/dist/ReactToastify.css';

import image1 from '../../images/jordan-air-1-mid-se.png';
import image2 from '../../images/adidas-ultra-bounce.png';
import image3 from '../../images/converse-run-star-hike.png';

function Wishlist() {

    const [products, setProducts] = useState([
        {
            id: 1,
            model: 'Jordan Air 1 Mid SE',
            price: '375',
            image: image1,
            quantity: 1,
            inStock: true
        },
        {
            id: 2,
            model: 'Adidas Ultra Bounce',
            price: '175',
            image: image2,
            quantity: 1,
            inStock: false
        },
        {
            id: 3,
            model: 'Converse Run Star Hike',
            price: '275',
            image: image3,
            quantity: 1,
            inStock: true
        }
    ]);

    const notify = () => toast.success('Item added to cart!');

    const renderWishlist = () => {
        if (!products || products.length === 0)
            return;
        var tempProducts = [...products];
        return products.map((product, index) => {
            return (
                <div className="wishlist-item" key={index}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className="wishlist-item-image">
                            <img src={product.image} alt="Product" className='wishlist-list-image' />
                        </div>
                        <div style={{ color: "#959595", marginLeft: '10px' }}>
                            <div className="wishlist-item-details">
                                <div style={{ marginBottom: '15px' }}>
                                    {product.model}
                                </div>
                                <div style={{ marginBottom: '15px', textAlign: 'start' }}>
                                    ${parseInt(product.price).toFixed(2)}
                                </div>
                                {
                                    product.inStock
                                        ?
                                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                                            <span className="quantity-btn"
                                                onClick={async () => {
                                                    if (tempProducts[index].quantity > 1) {
                                                        tempProducts[index].quantity -= 1;
                                                        await setProducts(tempProducts);
                                                    }
                                                }}
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
                                        :
                                        null
                                }
                            </div>
                        </div>
                        <DeleteFilled onClick={async () => {
                            tempProducts = await tempProducts.filter((item, count) => count !== index);
                            console.log(tempProducts);
                            await setProducts(tempProducts);
                        }} className="wishlist-item-remove" />
                    </div>
                    {
                        product.inStock
                            ?
                            <div className='wishlist-selected-btn' onClick={() => {
                                const cartProducts = JSON.parse(localStorage.getItem('cart'));
                                if (cartProducts) {
                                    const productInTheCart = cartProducts.find(item => item.id === product.id);
                                    if (productInTheCart) {
                                        cartProducts.find(item => item.id === product.id).quantity += product.quantity;
                                        localStorage.setItem('cart', JSON.stringify(cartProducts));
                                    }
                                    else {
                                        cartProducts.push(product);
                                        localStorage.setItem('cart', JSON.stringify(cartProducts));
                                    }
                                }
                                else {
                                    localStorage.setItem('cart', JSON.stringify([product]));
                                }
                                notify();
                            }}
                            >Add to Cart</div>
                            :
                            <div className='wishlist-out-of-stock'>Out of Stock!!</div>
                    }
                </div >
            )
        })
    }

    return (
        <>
            <Header />
            <div className="wishlist-container">
                <div className="wishlist-header">
                    <div className="wishlist-header-title">
                        Wishlist
                    </div>
                </div>
                <div className="wishlist-header-subtitle">
                    You have {products ? products.length : 0} items in your wishlist.
                </div>
                <div className="wishlist-list">
                    {renderWishlist()}
                </div>
            </div>
            <Footer />
            <ToastContainer position='top-right' autoClose={3000} />
        </>
    );
}

export default Wishlist;