import { BrowserRouter, Routes, Route } from 'react-router-dom';

import '../css/App.css';
import Home from './Home';
import LoginPage from './UserManagement/Login';
import Contact from './contact/Contact';
import FAQ from './faq/FAQ';
import SignupPage from './UserManagement/Signup';
import ForgotPassword from './UserManagement/ForgotPassword';
import Wishlist from './Pages/Wishlist';
import Reviews from './Pages/Reviews';
import { products } from '../products';
import EditProfile from './UserManagement/EditProfile';

function App() {

  localStorage.setItem('cart', JSON.stringify(products));
  localStorage.setItem('wishlist', JSON.stringify([
    '64c0800fdb2ebe7d302ae827',
    '64c08082db2ebe7d302ae828'
  ]));

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/editprofile" element={<EditProfile />} />
        

        <Route path="/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;