import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Home from './Pages/Home';
import LoginPage from './Pages/UserManagement/Login';
import Contact from './Pages/contact/Contact';
import FAQ from './Pages/faq/FAQ';
import SignupPage from './Pages/UserManagement/Signup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;