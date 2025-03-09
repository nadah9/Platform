// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './app/login/page'; // Import LoginPage component
import Home from './app/pages/home'; // Import Home page
import SignUpPage from './app/login/page2'; // Correct import path for SignUpPage component
import ChoicePage from "./components/ChoicePage";


const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 p-3">
        {/* Navigation bar styled with Tailwind */}
        <nav className="mb-6">
          <Link
            to="/"
            className="text-blue-500 hover:text-blue-700 mr-4 font-medium"
          >
            Home
          </Link>
          <Link
            to="/login"
            className="text-blue-500 hover:text-blue-700 mr-4 font-medium"
          >
            Login
          </Link>
      
        
        </nav>

        {/* Routes for homepage, login page, and sign up page */}
        <Routes>
          <Route path="/" element={<Home />} />              {/* Homepage */}
          <Route path="/login" element={<LoginPage />} />    {/* Login page */}
         /* <Route path="/SignUp" element={<SignUpPage />} /> */ {/* Sign up page */}
          <Route path="/ChoicePage" element={<ChoicePage />} />  {/* Page de choix */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
