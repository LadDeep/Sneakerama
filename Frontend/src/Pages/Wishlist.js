import { useState } from 'react';
import { DeleteFilled } from '@ant-design/icons';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import '../Styles/Wishlist.css';

import image1 from '../Assets/jordan-air-1-mid-se.png';
import image2 from '../Assets/adidas-ultra-bounce.png';
import image3 from '../Assets/converse-run-star-hike.png';

function Wishlist() {

    const [products, setProducts] = useState([
        {
            name: 'Jordan Air 1 Mid SE',
            price: '375',
            image: image1,
            quantity: 1,
            inStock: true
        },
        {
            name: 'Adidas Ultra Bounce',
            price: '175',
            image: image2,
            quantity: 1,
            inStock: false
        },
        {
            name: 'Converse Run Star Hike',
            price: '275',
            image: image3,
            quantity: 1,
            inStock: true
        }
    ]);

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
                                    {product.name}
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
                            <div className='wishlist-selected-btn'>Add to Cart</div>
                            :
                            <div className='wishlist-out-of-stock'>Out of Stock!!</div>
                    }
                </div>
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
        </>
    );
}

export default Wishlist;