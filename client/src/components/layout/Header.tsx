import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-primary text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">Memory Game</Link>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-4 items-center">
            <Link to="/" className="hover:text-gray-200">Home</Link>
            <Link to="/game" className="hover:text-gray-200">Play Game</Link>
            <Link to="/leaderboard" className="hover:text-gray-200">Leaderboard</Link>
            
            {user ? (
              <>
                <Link to="/profile" className="hover:text-gray-200">Profile</Link>
                <button
                  onClick={logout}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium py-1 px-3 rounded transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:text-gray-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-primary hover:bg-gray-100 font-medium py-1 px-3 rounded transition duration-300"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
        
        {/* Mobile navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-2 space-y-2">
            <Link to="/" className="block hover:text-gray-200 py-1">Home</Link>
            <Link to="/game" className="block hover:text-gray-200 py-1">Play Game</Link>
            <Link to="/leaderboard" className="block hover:text-gray-200 py-1">Leaderboard</Link>
            
            {user ? (
              <>
                <Link to="/profile" className="block hover:text-gray-200 py-1">Profile</Link>
                <button
                  onClick={logout}
                  className="block w-full text-left bg-red-600 hover:bg-red-700 text-white font-medium py-1 px-3 rounded mt-2 transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block hover:text-gray-200 py-1"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block bg-white text-primary hover:bg-gray-100 font-medium py-1 px-3 rounded mt-2 transition duration-300"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header; 