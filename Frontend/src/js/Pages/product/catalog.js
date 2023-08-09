import React, { useState, useEffect } from 'react';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import classes from '../../../css/Catalog.module.css';
import { authService } from '../../../services/authService';
import { getProducts, getProductById } from '../../../services/catalogService';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const Catalog = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  const [products, setProducts] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(6.5);
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

  useEffect(() => {
    if(!products){
      console.log("No products available")
      return(
      <h1>No products available</h1>)
    }
  }, [products]);

  // Get current posts
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  const addToCart = async (id) => {
    console.log(id);
    const user = await getUserData();
    console.log(user);
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
      "email": user.data.email,
      "brand": getProductbyID.product.brand,
      "model": getProductbyID.product.model,
      "image": getProductbyID.product.image,
      "price": getProductbyID.product.price,
      "color": getProductbyID.product.color,
      "size": size, //getProductbyID.product.size,
      "quantity": quantity, //getProductbyID.product.quantity
    }
    console.log(dataForCart)
    console.log(cartProducts)
    // eslint-disable-next-line
    if (cartProducts.length==0) {
      console.log("No products in cart")
      console.log([dataForCart])
      localStorage.setItem('cart', JSON.stringify([dataForCart]));
      return;
    }
    if (cartProducts.length > 0) {
      if (cartProducts.find(product => product._id === id)) {
        console.log("Product in cart")
        const index = cartProducts.findIndex(product => product._id === id);
        console.log(index)
        console.log(cartProducts[index])
        cartProducts[index].quantity = cartProducts[index].quantity + 1;
      }
      else {
        cartProducts.push(dataForCart);
      }

      localStorage.setItem('cart', JSON.stringify(cartProducts));
    }
    toast.success("Product added to cart");
  }
  };

  async function incrementSize(id) {
    const prod = await getProductById(id);
    console.log(prod.product.availableSizes[0])
    if(size< prod.product.availableSizes[prod.product.availableSizes.length-1]['size']){
    setSize(size + 0.5);
    }
  }

   async function decrementSize(id) {
    const prod = await getProductById(id);
    if(size> prod.product.availableSizes[0]['size']){
    setSize(size - 0.5);
    }
  }

  const filterMen = async () => {
    const productData = await getProducts();
    console.log(productData.product);
    console.log(productData.product[0].gender)
    let menProducts = [];
    for(let i=0;i<productData.product.length;i++){
      // eslint-disable-next-line
      if(productData.product[i].category=='men'){
        console.log(productData.product[i]);
        menProducts.push(productData.product[i]);
      }
    }
    setProducts(menProducts);
  };

  const filterWomen = async () => {
    const productData = await getProducts();
    console.log(productData.product);
    let womenProducts = [];
    for(let i=0;i<productData.product.length;i++){
      // eslint-disable-next-line
      if(productData.product[i].category=='women'){
        console.log(productData.product[i]);
        womenProducts.push(productData.product[i]);
      }
    }
    setProducts(womenProducts);
  };

  const filterKids = async () => {
    const productData = await getProducts();
    console.log(productData.product);
    let kidsProducts = [];
    for(let i=0;i<productData.product.length;i++){
      // eslint-disable-next-line
      if(productData.product[i].category=='boys'){
        console.log(productData.product[i]);
        kidsProducts.push(productData.product[i]);
      }
    }
    setProducts(kidsProducts);
  };

  return (
    <>
      <Header />
      {products.length > 0 ? (
      
      <div className={classes.catalogpage}>
        <div className={classes.cataloggrid}>
          <div className={classes.sidebar}>
            <h5 className={classes.catalogname}>Filters:</h5>
            <button className={classes.sidebarButton} onClick={filterMen}>Men</button>
            <button className={classes.sidebarButton} onClick={filterWomen}>Women</button>
            <button className={classes.sidebarButton} onClick={filterKids}>Kids</button>
          </div>
          <div className={classes.verticalline}></div>
          <div className={classes.catalogcards}>
            {currentProducts.map((product) => (
              <div key={product._id} className={classes.catalogcard} >
                <img src={product.image} alt={product.model} className={classes.catalogimage} onClick={()=> navigate(`/catalog/id:${product._id}`)}/>
                <h5 className={classes.catalogname}>{product.model}</h5>
                <h5>
                  ${product.price}
                  <br />
                   <button onClick={() => addToCart(product._id)} className={classes.addtocartbutton}>
                    Add to Cart
                  </button>
                  <br />

                  <div className={classes.sizeQuantityContainer}>
                  <h3>Size: </h3>
                  <button onClick={()=>decrementSize(product._id)}>-</button>
                    <span>US {size}</span>
                    <button onClick={()=>incrementSize(product._id)}>+</button>
                  </div>
                </h5>

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
      ) : (
        <div className={classes.catalogpage}>
        <div className={classes.cataloggrid}>
          <div className={classes.sidebar}>
            <h5 className={classes.catalogname}>Filters:</h5>
            <button className={classes.sidebarButton} onClick={filterMen}>Men</button>
            <button className={classes.sidebarButton} onClick={filterWomen}>Women</button>
            <button className={classes.sidebarButton} onClick={filterKids}>Kids</button>
          </div>
          <div className={classes.verticalline}></div>
          <div className={classes.catalogcards}>
             <h1>No products available :(</h1>
        </div>
        </div>
        </div>
        )}
        <ToastContainer position='top-right' autoClose={3000} />
      <Footer />
    </>
  );
};

export default Catalog;
