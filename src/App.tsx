import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { DataProvider } from './contexts/DataContext';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import BackToTop from './components/UI/BackToTop';

// Pages
import Home from './pages/Home';
import Info from './pages/Info';
import Gallery from './pages/Gallery';
import Directory from './pages/Directory';
import Agenda from './pages/Agenda';
import About from './pages/About';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';

function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/info" element={<Info />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/directory" element={<Directory />} />
                <Route path="/agenda" element={<Agenda />} />
                <Route path="/about" element={<About />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </main>
            <Footer />
            <BackToTop />
          </div>
        </Router>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;