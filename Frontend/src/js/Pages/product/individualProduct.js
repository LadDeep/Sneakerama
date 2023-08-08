import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import classes from '../../../css/MainEvent.module.css';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import { getProductById } from '../../../services/catalogService';
import newclasses from '../../../css/Catalog.module.css';
import { HeartFilled } from '@ant-design/icons';
import { ToastContainer, toast } from "react-toastify";
import { authService } from '../../../services/authService';

const IndividualProduct = () => {
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState(6.5);

    let { id } = useParams();

    id = id.replace('id:', '');

    const [product, setProduct] = useState(null);

    useEffect(() => {
        console.log(id);
        const getProduct = async () => {
            const productData = await getProductById(id);
            setProduct(productData.product);
        }

        getProduct();
    }, [id]);   

    if (!product) {
        return 'Loading...';
    }


    const incrementQuantity = () => {
        if (quantity < 10)
            setQuantity(quantity + 1);
        else
            toast.error("You can't add more than 10 items to cart");
    }
    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }
    const incrementSize = () => {
        if (size < 10)
            setSize(size + 0.5);
        else
            toast.error("10 is the maximum size available");
    }
    const decrementSize = () => {
        if (size >= 6.5) {
            setSize(size - 0.5);
        }
        else
            toast.error("6 is the minimum size available");
    }
    const getUserData = async () => {
        const result = await authService.getCurrentUser();
        return result;
    };


    const addToCart = async () => {
        console.log(id);
        const user = await getUserData();
        if (!user.data) {
            toast.error("Please login to add to cart");
            return;
        }
        else {
            const cartProducts = JSON.parse(localStorage.getItem('cart'));
            console.log(cartProducts)
            const getProductbyID = await getProductById(id);
            console.log(getProductbyID.product)
            console.log(getProductbyID.product.availableSizes)
            let dataForCart = {
                "_id": getProductbyID.product._id,
                "email": user.email,
                "brand": getProductbyID.product.brand,
                "model": getProductbyID.product.model,
                "image": getProductbyID.product.image,
                "price": getProductbyID.product.price,
                "color": getProductbyID.product.color,
                "size": size,
                "quantity": quantity,
            }
            console.log(dataForCart)
            if (cartProducts === null) {
                localStorage.setItem('cart', JSON.stringify([dataForCart]));
            } else {
                let productExists = false;
                cartProducts.forEach((product) => {
                    console.log(product);
                    if (product._id === dataForCart._id) {
                        productExists = true;
                    }
                });
                if (!productExists) {
                    cartProducts.push(dataForCart);
                    localStorage.setItem('cart', JSON.stringify(cartProducts));
                }
                else {
                    for (let i = 0; i < cartProducts.length; i++) {
                        if (cartProducts[i]._id === dataForCart._id) {
                            cartProducts[i].quantity += dataForCart.quantity;
                            localStorage.setItem('cart', JSON.stringify(cartProducts));
                        }
                    }
                }
            }
            toast.success("Added to cart");
            //   navigate('/cart');
        }
    }

    const hexColor = product.color;

    const red = parseInt(hexColor.slice(1, 3), 16);
    const green = parseInt(hexColor.slice(3, 5), 16);
    const blue = parseInt(hexColor.slice(5, 7), 16);


    const colorStyle = {
        backgroundColor: `rgb(${red}, ${green}, ${blue})`,
        width: '10px',
        height: '10px',
        maxHeight: '30px',
        maxWidth: '30px',
        marginRight: '30px',

    };

    const wishlist = async (id) => {
        if (!localStorage.getItem('user')) {
            toast.error("Please login to add to wishlist");
            return;
        }
        else{
        const wishlistProducts = JSON.parse(localStorage.getItem('wishlist'));
        console.log(wishlistProducts)

        if (wishlistProducts === null) {
            localStorage.setItem('wishlist', JSON.stringify([product._id]));
            toast.success("Added to Wishlist");
        }
        else {
            if (wishlistProducts.find(id => id === product._id)) {
                for (let i = 0; i < wishlistProducts.length; i++) {
                    console.log(wishlistProducts[i])
                    console.log(product._id)
                    if (wishlistProducts[i] === product._id) {
                        wishlistProducts.splice(i, 1);
                        toast.success("Removed from Wishlist");
                        localStorage.setItem('wishlist', JSON.stringify(wishlistProducts));

                        break;
                    }
                }
            }
            else {
                console.log(wishlistProducts)
                console.log(product._id)
                wishlistProducts.push(product._id);
                localStorage.setItem('wishlist', JSON.stringify(wishlistProducts));
                toast.success("Added to Wishlist");
            }
        }
    }
    }

    return (
        <>
            <Header />
            <div className={classes.eventpage} style={{ display: 'grid', justifyContent: 'center', alignItems: 'center' }}>
                <h3 className={classes.eventname}>{product.model}</h3>
                <div className={classes.eventinfo} style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                    <div className={classes.eventimage} style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                        <img src={product.image} alt={product.model} style={{ maxHeight: '80%', maxWidth: '80%' }} />
                    </div>
                    <div className={classes.eventdetails}>
                        <p>Brand: {product.brand}</p>
                        <p>Model: {product.model}</p>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            Color: {<span style={colorStyle}>{ }</span>}
                        </div>
                        <p>Price: ${product.price}</p>
                        <p>Description: {product.description} </p>
                    </div>

                </div>
                <div className={newclasses.sizeQuantityContainer}>
                    <h3>Size: </h3>
                    <button onClick={() => decrementSize(product._id)}>-</button>
                    <span>US {size}</span>
                    <button onClick={() => incrementSize(product._id)}>+</button>
                    {<span></span>}
                    <h3>Quantity: </h3>
                    <button onClick={() => decrementQuantity()}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => incrementQuantity()}>+</button>
                </div>
                <button className={classes.registerbutton} onClick={addToCart}>Add To Cart</button>
                <div style={{ justifyContent: 'right', alignItems: 'right', display: 'grid' }}>
                    <button className={classes.registerbutton} onClick={wishlist}> Add to Wishlist
                        {<HeartFilled style={{ fontSize: '20px', color: 'red', marginLeft: '10px' }} />}
                    </button>
                </div>
            </div>
            <ToastContainer position='top-right' autoClose={3000} />
            <Footer />
        </>
    );
};



export default IndividualProduct;
