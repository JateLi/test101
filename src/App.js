import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import Navigation from './components/Navigation';
import KeyboardShortcuts from './components/KeyboardShortcuts';
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Games from './pages/Games';
import Tools from './pages/Tools';
import Gallery from './pages/Gallery';
import About from './pages/About';
import NotFound from './pages/NotFound';
import './App.css';

//test commit
function App() {
  useKeyboardNavigation();

  return (
    <ThemeProvider>
      <ErrorBoundary>
        <Router>
          <div className="App">
            <div className="background-animation">
              <div className="floating-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
                <div className="shape shape-4"></div>
                <div className="shape shape-5"></div>
              </div>
            </div>

            <Navigation />
            <KeyboardShortcuts />

            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/games" element={<Games />} />
                <Route path="/tools" element={<Tools />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </Router>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;