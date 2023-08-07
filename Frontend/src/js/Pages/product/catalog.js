import React, { useState, useEffect } from 'react';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import classes from '../../../css/Catalog.module.css';
import { authService } from '../../../services/authService';
import { getProducts, getProductById } from '../../../services/catalogService';

const Catalog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  const [products, setProducts] = useState([]);
  const getUserData = async () => {
    const result = await authService.getCurrentUser();
    return result;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const productData = await getProducts();
      setProducts(productData.product);
    };

    fetchProducts();
  }, []);

  // Get current posts
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct= indexOfLastProduct - productsPerPage;

  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  const addToCart = async (id) => {
    console.log(id);
    const user = await getUserData();
    const cartProducts = JSON.parse(localStorage.getItem('cart'));
    console.log(cartProducts)
    const getProductbyID= await getProductById(id);
    console.log(getProductbyID.product)
    let dataForCart={
      "_id": getProductbyID.product._id,
      "email": user.data.email,
      "brand": getProductbyID.product.brand,
      "model": getProductbyID.product.model,
      "image": getProductbyID.product.image,
      "price": getProductbyID.product.price,
      "color": getProductbyID.product.color,
      "size": 8, //getProductbyID.product.size,
      "quantity": 1, //getProductbyID.product.quantity
    }
    if (cartProducts == null) {
      localStorage.setItem('cart', JSON.stringify([dataForCart]));
      return;
    }
    if(cartProducts.length > 0){
      if(cartProducts.find(product => product._id === id)){
        console.log("Product in cart")
        const index = cartProducts.findIndex(product => product._id === id);
        console.log(index)
        console.log(cartProducts[index])
        cartProducts[index].quantity = cartProducts[index].quantity + 1;
      }
      else{
        cartProducts.push(dataForCart);
      }

    localStorage.setItem('cart', JSON.stringify(cartProducts));
    }
}


  return (
    <>
      <Header />
      <div className={classes.catalogpage}>
        <div className={classes.cataloggrid}>
          <div className={classes.sidebar}>
            {/* Add your filter content and buttons here */}
            <h5 className={classes.catalogname}>Filters:</h5>
            <button className={classes.sidebarButton}>Button 1</button>
            <button className={classes.sidebarButton}>Button 2</button>
            <button className={classes.sidebarButton}>Button 3</button>
          </div>
          <div className={classes.verticalline}></div>
          <div className={classes.catalogcards}>
            {currentProducts.map((product) => (
              <div key={product._id} className={classes.catalogcard}>
              <img src={product.image} alt={product.model} className={classes.catalogimage} />
              <h5 className={classes.catalogname}>{product.model}</h5>
              <button onClick={() => addToCart(product._id)} className={classes.addtocartbutton}>
                Add to Cart
              </button>
              </div>
          ))}
        </div>
      </div>
      <div className={classes.catalogpagination}>
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
            Prev
          </button>
          {Array(Math.ceil(products.length / productsPerPage)).fill(null).map((_, idx) => (
            <button key={idx} onClick={() => paginate(idx + 1)} className={currentPage === idx + 1 ? classes.activePage : ''}>
              {idx + 1}
            </button>
          ))}
          <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(products.length / productsPerPage)}>
            Next
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Catalog;
