import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Characters from './pages/Characters';
import Movies from './pages/Movies';
import Home from './pages/Home';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className='min-h-screen flex flex-col bg-black text-gray-100'>
        <Navbar />
          <main className='flex-grow'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/charcters" element={<Characters />} />
              <Route path="/movies" element={<Movies />} />
            </Routes>
          </main>
          <Footer />
      </div>
    </Router>
  )
}

export default App;
