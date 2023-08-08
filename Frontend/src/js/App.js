import { BrowserRouter, Routes, Route } from 'react-router-dom';

import '../css/App.css';
import Home from './Home';
import LoginPage from './UserManagement/Login';
import Contact from './Pages/contact/Contact';
import FAQ from './Pages/faq/FAQ';
import SignupPage from './UserManagement/Signup';
import ForgotPassword from './UserManagement/ForgotPassword';
import Wishlist from './Pages/Wishlist';
import Reviews from './Pages/Reviews';
import Payment  from './Payment/Payment';
import Orders from './Orders/orders'
import Events from './Pages/events/Events';
import MainEvent from './Pages/events/MainEvent';
import EventRegistration from './Pages/eventsRegistration/EventRegistration';
import PostEvent from './Pages/eventposting/NewEvent';
import EditProfile from './UserManagement/EditProfile';
import AddProduct from './Pages/AddProduct';
import EditProduct from './Pages/EditProduct';
import Inventory from './Pages/Inventory';
import OrderDetails from './Pages/OrderDetails';
import Catalog from './Pages/product/catalog';
import IndividualProduct from './Pages/product/individualProduct';
import { authService } from '../services/authService';
import { useEffect, useState } from 'react';

function App() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [isadmin, setIsAdmin] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const getCurrentUser = async () => {
    const result = await authService.getCurrentUser();
    console.log(result.data);
    if (result.data) {
      if (result.data.isAdmin == true) {
        console.log("Admin");
        setIsAdmin(true);
      }
      if (result.data.isSeller == true) {
        console.log("Seller");
        setIsSeller(true);
      }
      if (result.data.isVerifiedSeller == true) {
        console.log("Verified");
        setIsVerified(true);
      }
    }
    console.log(isadmin);
    console.log(isSeller);
    console.log(isVerified);
    return result;
  }

  getCurrentUser();
  useEffect(() => {
    getCurrentUser();
  }, [user])


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/events" element={<Events />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/event/:id" element={<MainEvent />} />
        <Route path='/catalog' element={<Catalog />} />
        <Route path='/catalog/:id' element={<IndividualProduct />} />

        {isadmin ? (
          <>
            <Route path="/admin/home" element={<Home />} />
          </>
        ) : null}

        {isSeller && isVerified ? (
          <>
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/inventory/add-product" element={<AddProduct />} />
            <Route path="/inventory/edit-product" element={<EditProduct />} />
          </>
        ) : null}

        {user ? (
          <>
            <Route path="/orders" element={<Orders />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/eventregistration/:id" element={<EventRegistration />} />
            <Route path="/postevent" element={<PostEvent />} />
            <Route path="/editprofile" element={<EditProfile />} />
          </>
        ) : null}

        <Route path="/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );

}

export default App;