import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ReactComponent } from '../simplifyTypes';

function HomePage(): ReactComponent {
  const { user } = useAuth();
  
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Welcome to Memory Game
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Test your memory by matching pairs of cards. Challenge yourself with different difficulty levels and compete on the leaderboard!
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">How to Play</h2>
            <ol className="text-left text-gray-700 space-y-2 mb-4">
              <li>1. Flip two cards at a time to find matching pairs</li>
              <li>2. Remember card positions to make fewer moves</li>
              <li>3. Match all pairs to complete the game</li>
              <li>4. Aim for the lowest number of moves and time</li>
            </ol>
            <p className="text-gray-600">
              The game ends when all cards are matched. Your score is based on the number of moves and time taken.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Game Features</h2>
            <ul className="text-left text-gray-700 space-y-2 mb-4">
              <li>• Two difficulty levels: 4x4 and 6x6 grid</li>
              <li>• Track your moves and time</li>
              <li>• Save your scores to the leaderboard</li>
              <li>• View your game history</li>
              <li>• Compete with other players</li>
            </ul>
            <p className="text-gray-600">
              Create an account to save your progress and appear on the leaderboard!
            </p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
          <Link 
            to="/game" 
            className="bg-primary hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-md text-lg transition duration-300"
          >
            {user ? 'Play Now' : 'Try the Game'}
          </Link>
          
          {!user && (
            <Link 
              to="/register" 
              className="bg-secondary hover:bg-cyan-700 text-white font-bold py-3 px-8 rounded-md text-lg transition duration-300"
            >
              Create Account
            </Link>
          )}
          
          <Link 
            to="/leaderboard" 
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-8 rounded-md text-lg transition duration-300"
          >
            View Leaderboard
          </Link>
        </div>
        
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Memory Benefits</h2>
          <p className="text-gray-600">
            Playing memory games can improve cognitive functions, concentration, and visual memory. Regular practice can help maintain brain health and enhance mental agility.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage; 