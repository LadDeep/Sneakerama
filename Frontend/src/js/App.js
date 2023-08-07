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
import Payment  from './Components/Payment';
import Orders from './Orders/orders'
import Events from './Pages/events/Events';
import MainEvent from './Pages/events/MainEvent';
import EventRegistration from './Pages/eventsRegistration/EventRegistration';
import PostEvent from './Pages/eventposting/NewEvent';
import { products } from '../products';
import EditProfile from './UserManagement/EditProfile';
import AddProduct from './Pages/AddProduct';
import EditProduct from './Pages/EditProduct';
import Inventory from './Pages/Inventory';
import Catalog from './Pages/product/catalog';

function App() {

  localStorage.setItem('cart', JSON.stringify(products));
  localStorage.setItem('wishlist', JSON.stringify([
    '64c1284710ff280cc12d7b5a',
    '64c08082db2ebe7d302ae828',
    '64c16a0b961cd60d0e9247b4'
  ]));
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/events" element={<Events />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/eventregistration/:id" element={<EventRegistration />} />
        <Route path="/event/:id" element={<MainEvent />} />
        <Route path="/postevent" element={<PostEvent />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/edit-product" element={<EditProduct />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path='/catalog' element={<Catalog />} />
        

        <Route path="/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;