import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Footer from './components/Footer';
import AppRoutes from './routes';
import { BrowserRouter } from 'react-router-dom';  // Correct import

function App() {
  return (
    <BrowserRouter>  {/* Ensure that your entire app is wrapped in Router */}
  
      <AppRoutes />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
