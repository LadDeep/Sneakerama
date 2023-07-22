import '../Styles/Payment.css';
import { useEffect, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { ToastContainer, toast } from "react-toastify";
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import 'react-toastify/dist/ReactToastify.css';
import image1 from '../Assets/jordan-air-1-mid-se.png';
import image2 from '../Assets/converse-run-star-hike.png';

function Payment() {

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


    const [products,] = useState([
        {
            name: 'Nike Sneaker 1',
            price: '325',
            image: image1,
            quantity: 1
        },
        {
            name: 'Nike Sneaker 2',
            price: '375',
            image: image2,
            quantity: 1
        }
    ]);
    var subtotal = 0

    const renderProducts = () => {
        return products.map((product, index) => {
            subtotal += parseInt(product.price) * parseInt(product.quantity);
            return (
                <div className="checkout-item" key={index}>
                    <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                        <div style={{ position: 'relative', width: '70px', height: '70px' }}>
                            <img src={product.image} alt="Product" className='cart-product-image' />
                            <div className='checkout-quantity'>
                                <div style={{ margin: 'auto' }}>{product.quantity}</div>
                            </div>
                        </div>
                        <div style={{ color: "#959595", marginLeft: '20px', width: '100%' }}>
                            <div className="checkout-details">
                                <div className='checkout-product-details'>
                                    <div className="checkout-item-name" style={{ color: "#000", marginBottom: '15px' }}>
                                        {product.name}
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
    const handleSubmit = () => {
        // Perform validation for all fields
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
        // Additional validation for phone if needed
    
        // Update the errors state
        setErrors(newErrors);
    
        // If there are no errors, proceed to the next step (e.g., payment)
        if (Object.keys(newErrors).length === 0) {
            setOnPayment(true); // Move to the payment information section
            // Your logic for payment or any other action here
        }
      };

    // reference from https://www.unimedia.tech/paypal-checkout-integration-with-react/
    // creates a paypal order
    // Card Number: 4000001240000000
    // Expiration Date: Future Month/Future/Current Year
    // CVV: Any 3 digits
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

    //capture likely error
    const onError = (data, actions) => {
        setErrorMessage("An Error occurred with your payment ");
        console.log(data);
    };

    useEffect(() => {
        // eslint-disable-next-line
        if (success) {
            notify();
            console.log("success");
        }
    },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [success]
    );

    return (
        <>
          <Header />
          <div style={{ display: 'flex', alignItems: 'stretch', height: '100vh' }}>
            <div style={{ width: '40%', paddingLeft: '250px', borderRight: '1px solid #c1c1c1', paddingTop: '150px' }}>
              <div style={{ fontSize: '15px', fontWeight: '600', marginTop: '40px', marginBottom: '5px' }}>Contact Information</div>
              <div style={{ marginLeft: '10px' }}>johndoe@gmail.com</div>
              {onPayment ? (
                <>
                  <div style={{ fontSize: '15px', fontWeight: '600', marginTop: '40px', marginBottom: '5px' }}>Payment Information</div>
                  <div className="checkout-form">
                    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                      <div className='selected-btn' onClick={() => toast.success("Payment Successful.")}>Cash on Delivery</div>
                    </div>
                    <div style={{ marginBlock: '15px', textAlign: 'center', fontStyle: 'italic', color: '#929292' }} >or</div>
                    <PayPalScriptProvider options={{ "client-id": 'AQzW_bdiCPX0wlUygTaqwFYxuCz_gy0ydq1fmRGn6XnNq__-RMOsNLUOdDrvc-Sv19c1CR8yg6Ff_aUC' }}>
                      <PayPalButtons
                        style={{ layout: "vertical" }}
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
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <input
                        type="text"
                        placeholder='First Name'
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        className="checkout-input"
                        style={{ width: '100%', marginRight: '10px' }}
                      />
                      <input
                        type="text"
                        placeholder='Last Name'
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        className="checkout-input"
                        style={{ width: '98%', marginLeft: '10px' }}
                      />
                    </div>
                    {errors.firstName && <div style={{ color: 'red', fontSize: '12px' }}>{errors.firstName}</div>}
                    {errors.lastName && <div style={{ color: 'red', fontSize: '12px' }}>{errors.lastName}</div>}
                    <input
                      type="text"
                      placeholder='Address'
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                      className="checkout-input"
                      style={{ width: '95%' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <input
                        type="text"
                        placeholder='City'
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        className="checkout-input"
                        style={{ width: '98%', marginRight: '10px' }}
                      />
                      <input
                        type="text"
                        placeholder='Province'
                        value={province}
                        onChange={e => setProvince(e.target.value)}
                        className="checkout-input"
                        style={{ width: '98%', marginInline: '10px' }}
                      />
                      <input
                        type="text"
                        placeholder='Postal Code'
                        value={postalCode}
                        onChange={e => setPostalCode(e.target.value)}
                        className="checkout-input"
                        style={{ width: '98%', marginLeft: '10px' }}
                      />
                    </div>
                    {errors.address && <div style={{ color: 'red', fontSize: '12px' }}>{errors.address}</div>}
                    {errors.city && <div style={{ color: 'red', fontSize: '12px' }}>{errors.city}</div>}
                    {errors.province && <div style={{ color: 'red', fontSize: '12px' }}>{errors.province}</div>}
                    {errors.postalCode && <div style={{ color: 'red', fontSize: '12px' }}>{errors.postalCode}</div>}
                    <input
                      type="text"
                      placeholder='Phone (optional)'
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="checkout-input"
                      style={{ width: '95%' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'end' }} onClick={handleSubmit}>
                      <div className="selected-btn">Continue to Payment</div>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div style={{ backgroundColor: '#F6F6F6', flex: '1', paddingTop: '150px' }}>
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
          <ToastContainer position="top-left" autoClose={5000} />
          <Footer />
        </>
      );
              }      

export default Payment;