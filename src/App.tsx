import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className='min-h-screen flex flex-col bg-black text-gray-100'>
        <Navbar />
          <main className='flex-grow'>
            <Routes>
              
            </Routes>
          </main>
      </div>
    </Router>
  )
}

export default App;
