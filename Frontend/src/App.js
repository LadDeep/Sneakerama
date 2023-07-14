import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Home from './Pages/Home';
import Contact from './Pages/Contact';
import FAQ from './Pages/FAQ';
import Wishlist from './Pages/Wishlist';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;