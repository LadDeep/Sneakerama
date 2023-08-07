/*Dhruv Kothari*/
import '../../css/Payment.css';
import { useEffect, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { ToastContainer, toast } from "react-toastify";
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import 'react-toastify/dist/ReactToastify.css';
import { addPaymentDetails } from '../../services/payments';
import { authService } from '../../services/authService';
import { addOrderDetails } from '../../services/orders';
import { useNavigate } from 'react-router-dom';


function Payment() {
  const [products,] = useState(JSON.parse(localStorage.getItem('cart')));
  const [wishlist,] = useState(JSON.parse(localStorage.getItem('wishlist')));
  console.log(wishlist,"wishlist")
  console.log(products,"cart")


  var subtotal = 0

  const notify = () => toast.success("Payment Successful.");
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');
  const [onPayment, setOnPayment] = useState(false);
  const [success, setSuccess] = useState(false);
  const [, setErrorMessage] = useState("");
  const [, setOrderID] = useState(null);
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
  });
  const isFieldEmpty = (value) => {
    return value.trim() === '';
  };
  const navigate = useNavigate();




  //rendering the products which are added by the User in the Cart
  const renderProducts = () => {
    return products.map((product, index) => {
      subtotal += parseInt(product.price) * parseInt(product.quantity);
      return (
        <div className="checkout-item" key={index}>
          <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <div style={{ position: 'relative', width: '70px', height: '70px',marginTop:'20px' }}>
              <img src={product.image[0]} alt="Product" className='cart-product-image' />
              <div className='checkout-quantity'>
                <div style={{ margin: 'auto' }}>{product.quantity}</div>
              </div>
            </div>
            <div style={{ color: "#959595", marginLeft: '20px', width: '100%' }}>
              <div className="checkout-details">
                <div className='checkout-product-details'>
                  <div className="checkout-item-name" style={{ color: "#000", marginBottom: '15px' }}>
                    {product.model}
                  </div>
                </div>
                <div className='checkout-item-price' style={{ color: "#000" }}>
                  ${(parseInt(product.price) * parseInt(product.quantity)).toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    })
  }
  // Checking neccessary validations on Submitting
  const handleSubmit = () => {
    const newErrors = {};
    if (isFieldEmpty(firstName)) {
      newErrors.firstName = 'First name is required.';
    }
    if (isFieldEmpty(lastName)) {
      newErrors.lastName = 'Last name is required.';
    }
    if (isFieldEmpty(address)) {
      newErrors.address = 'Address is required.';
    }
    if (isFieldEmpty(city)) {
      newErrors.city = 'City is required.';
    }
    if (isFieldEmpty(province)) {
      newErrors.province = 'Province is required.';
    }
    if (isFieldEmpty(postalCode)) {
      newErrors.postalCode = 'Postal code is required.';
    }
    if (Object.keys(newErrors).length === 0) {
      setOnPayment(true);
    }
    setErrors(newErrors);

  };

  // reference from https://www.unimedia.tech/paypal-checkout-integration-with-react/
  // creates a paypal order
  // Card Number: 4000001240000000
  // Expiration Date: Future Month/Future/Current Year
  // CVV: Any 3 digits
  //Creating a order for PayPal
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Payment for ",
            amount: {
              currency_code: "USD",
              value: (subtotal + 15).toFixed(2),
            },
          },
        ],
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderID) => {
        setOrderID(orderID);
        return orderID;
      });
  };

  // check Approval
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      setSuccess(true);
    });
  };
  // const savePaymentDetailsToBackend = async (paymentDetails) => {
  //   try {
  //     const response = await addPaymentDetails(paymentDetails);
  //     console.log(response,"sss")

  //     if (response.status===200) {
  //       notify();
  //     } else {
  //       toast.error("An error occurred while processing the payment.");
  //     }
  //   } catch (error) {
  //     console.error('Error processing payment:', error);
  //     toast.error('An error occurred while processing the payment.');
  //   }
  // };

  //capture likely error
  const onError = (data, actions) => {
    setErrorMessage("An Error occurred with your payment ");
    console.log(data);
  };

  useEffect(() => {
    // Function to save payment details to the backend
    const savePaymentAndOrderDetails = async () => {
      try {
        const paymentResponse = await addPaymentDetails({
          firstName,
          lastName,
          address,
          city,
          province,
          postalCode,
          phone,
        });

        if (paymentResponse.status === 200) {
          notify(); // Notify on successful payment
          saveOrderDetails();
        } else {
          toast.error("An error occurred while processing the payment.");
        }
      } catch (error) {
        console.error('Error processing payment:', error);
        toast.error('An error occurred while processing the payment.');
      }
    };

    const saveOrderDetails = async () => {
      try {
        const userName = await fetchUserData();
        console.log(userName, "userName");
        console.log(products, "products");
        const productIDs = products.map((product) => product._id);
        console.log(productIDs,"productsidfrom cart")

        // console.log(wishlist, "productIDs")
        if (products) {
          const currentDate = new Date();
          const quantities = products.map((product) => {
            const quantityValue = parseInt(product.quantity); 

            console.log(quantityValue,"quantity")
            return isNaN(quantityValue) ? 0 : quantityValue;

          });
          const orderData = {
            username: userName,
            orderItems: productIDs,
            total: (subtotal + 15).toFixed(2),
            createdAt: currentDate,
            quantities: quantities, 

          };
          console.log(orderData, "orderData");

          const response = await addOrderDetails(orderData);
          // console.log(response, "order response")

          if (response.status === 200) {
          } else {
            console.error('Failed to send order data to the backend.');
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (success) {
      savePaymentAndOrderDetails();
      navigate('/orders');
      console.log("success");
    }
    // eslint-disable-next-line
  }, [success, firstName, lastName, address, city, province, postalCode, phone, products]);




  async function fetchUserData() {
    try {
      const response = await authService.getCurrentUser();
      const user = response.data;
      const username = user.email;
      return username;
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }


  return (
    <>
      <Header />
      <div style={{ display: 'flex', alignItems: 'stretch', minHeight: '100vh', flexWrap: 'wrap' }}>
        <div className="payment-bg">
          {/* <div style={{ fontSize: '15px', fontWeight: '600', marginTop: '40px', marginBottom: '5px' }}>Contact Information</div> */}
          {/* <div style={{ marginLeft: '10px' }}>johndoe@gmail.com</div> */}
          {onPayment ? (
            <>
              {/* <div style={{ fontSize: '15px', fontWeight: '600', marginTop: '40px', marginBottom: '5px' }}>Payment Information</div> */}
              <div className="checkout-form">
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                  {/* <div className='selected-btn' onClick={() => toast.success("Payment Successful.")}>Cash on Delivery</div> */}
                </div>
                {/* <div style={{ marginBlock: '15px', textAlign: 'center', fontStyle: 'italic', color: '#929292' }} >or</div> */}
                <PayPalScriptProvider options={{ "client-id": 'AQzW_bdiCPX0wlUygTaqwFYxuCz_gy0ydq1fmRGn6XnNq__-RMOsNLUOdDrvc-Sv19c1CR8yg6Ff_aUC' }}
                >
                  <PayPalButtons
                    style={{ layout: "vertical", zIndex: '1' }}
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                  />
                </PayPalScriptProvider>
                <div style={{ display: 'flex', justifyContent: 'end' }} onClick={() => setOnPayment(false)}>
                  <div className="selected-btn">Back to Shipping</div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div style={{ fontSize: '15px', fontWeight: '600', marginTop: '40px', marginBottom: '5px' }}>Shipping Address</div>
              <div className="checkout-form">
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                  <div className="input-wrapper" >
                    <input
                      type="text"
                      placeholder='First Name'
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                      className="checkout-input"
                    />
                    {errors.firstName && <div style={{ color: 'red', fontSize: '12px', marginBottom: '20px' }}>{errors.firstName}</div>}
                  </div>
                  <div className="input-wrapper" >
                    <input
                      type="text"
                      placeholder='Last Name'
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                      className="checkout-input"
                    />
                    {errors.lastName && <div style={{ color: 'red', fontSize: '12px', marginBottom: '20px' }}>{errors.lastName}</div>}
                  </div>
                </div>
                <div className="input-wrapper" >
                  <input
                    type="text"
                    placeholder='Address'
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    className="checkout-input"
                    style={{ width: '100%' }}
                  />
                  {errors.address && <div style={{ color: 'red', fontSize: '12px', marginBottom: '20px' }}>{errors.address}</div>}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                  <div className="input-wrapper" >
                    <input
                      type="text"
                      placeholder='City'
                      value={city}
                      onChange={e => setCity(e.target.value)}
                      className="checkout-input"
                    />
                    {errors.city && <div style={{ color: 'red', fontSize: '12px', marginBottom: '20px' }}>{errors.city}</div>}
                  </div>
                  <div className="input-wrapper" >
                    <input
                      type="text"
                      placeholder='Province'
                      value={province}
                      onChange={e => setProvince(e.target.value)}
                      className="checkout-input"
                    />
                    {errors.province && <div style={{ color: 'red', fontSize: '12px', marginBottom: '20px' }}>{errors.province}</div>}
                  </div>
                  <div className="input-wrapper" >
                    <input
                      type="text"
                      placeholder='Postal Code'
                      value={postalCode}
                      onChange={e => setPostalCode(e.target.value)}
                      className="checkout-input"
                    />
                    {errors.postalCode && <div style={{ color: 'red', fontSize: '12px', marginBottom: '20px' }}>{errors.postalCode}</div>}
                  </div>
                </div>
                <input
                  type="text"
                  placeholder='Phone (optional)'
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="checkout-input"
                  style={{ width: '100%', marginBottom: '20px' }}
                />
                <div style={{ display: 'flex', justifyContent: 'end' }} onClick={handleSubmit}>
                  <div className="selected-btn">Continue to Payment</div>
                </div>
              </div>
            </>
          )}
        </div>
        <div className='cart-items-bg'>
          <div style={{ marginLeft: '20px', marginTop: '20px', width: '90%' }}>
            {renderProducts()}
            <div className='checkout-item'>
              <div className='checkout-total-item'>
                <div className='checkout-label'>Subtotal</div>
                <div className='checkout-value'>${subtotal.toFixed(2)}</div>
              </div>
              <div className='checkout-total-item'>
                <div className='checkout-label'>Shipping</div>
                <div className='checkout-value'>$15.00</div>
              </div>
              <div className='checkout-total-item'>
                <div className='checkout-total'>Total</div>
                <div className='checkout-total-value'><span style={{ fontSize: '13px', color: '#929292', fontWeight: '400', fontStyle: 'italic' }}>USD $</span> {(subtotal + 15).toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
      <Footer />
    </>
  );
}

export default Payment;
