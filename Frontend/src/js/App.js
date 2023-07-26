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
import Events from './Pages/events/Events';
import MainEvent from './Pages/events/MainEvent';
import EventRegistration from './Pages/eventsRegistration/EventRegistration';
import PostEvent from './Pages/eventposting/NewEvent';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/events" element={<Events />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/eventregistration/:id" element={<EventRegistration />} />
        <Route path="/event/:id" element={<MainEvent />} />
        <Route path="/postevent" element={<PostEvent />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;