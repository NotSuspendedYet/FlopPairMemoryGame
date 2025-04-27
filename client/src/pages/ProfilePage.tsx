import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';

interface GameHistory {
  _id: string;
  moves: number;
  time: number;
  boardSize: string;
  completedAt: string;
}

const ProfilePage: React.FC = () => {
  const [gameHistory, setGameHistory] = useState<GameHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user, token } = useAuth();
  
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  // Fetch user's game history
  useEffect(() => {
    const fetchGameHistory = async () => {
      if (!token) return;
      
      try {
        setLoading(true);
        const config = {
          headers: {
            'x-auth-token': token
          }
        };
        
        const res = await axios.get(`${API_URL}/game/history`, config);
        setGameHistory(res.data.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching game history:', err);
        setError('Could not load your game history');
      } finally {
        setLoading(false);
      }
    };

    fetchGameHistory();
  }, [token, API_URL]);

  // Format time (seconds) to mm:ss
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Format date to local date and time string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Calculate user stats
  const calculateStats = () => {
    if (gameHistory.length === 0) {
      return {
        gamesPlayed: 0,
        bestScore4x4: { moves: '-', time: '-' },
        bestScore6x6: { moves: '-', time: '-' },
        avgMoves4x4: '-',
        avgTime4x4: '-',
        avgMoves6x6: '-',
        avgTime6x6: '-'
      };
    }
    
    const games4x4 = gameHistory.filter(game => game.boardSize === '4x4');
    const games6x6 = gameHistory.filter(game => game.boardSize === '6x6');
    
    // Best scores (lowest moves, then time)
    const bestGame4x4 = games4x4.length > 0 
      ? [...games4x4].sort((a, b) => a.moves === b.moves ? a.time - b.time : a.moves - b.moves)[0]
      : null;
      
    const bestGame6x6 = games6x6.length > 0 
      ? [...games6x6].sort((a, b) => a.moves === b.moves ? a.time - b.time : a.moves - b.moves)[0]
      : null;
    
    // Average stats
    const avgMoves4x4 = games4x4.length > 0 
      ? Math.round(games4x4.reduce((sum, game) => sum + game.moves, 0) / games4x4.length) 
      : '-';
      
    const avgTime4x4 = games4x4.length > 0 
      ? Math.round(games4x4.reduce((sum, game) => sum + game.time, 0) / games4x4.length) 
      : '-';
      
    const avgMoves6x6 = games6x6.length > 0 
      ? Math.round(games6x6.reduce((sum, game) => sum + game.moves, 0) / games6x6.length)
      : '-';
      
    const avgTime6x6 = games6x6.length > 0 
      ? Math.round(games6x6.reduce((sum, game) => sum + game.time, 0) / games6x6.length)
      : '-';
    
    return {
      gamesPlayed: gameHistory.length,
      bestScore4x4: bestGame4x4 
        ? { moves: bestGame4x4.moves, time: formatTime(bestGame4x4.time) }
        : { moves: '-', time: '-' },
      bestScore6x6: bestGame6x6
        ? { moves: bestGame6x6.moves, time: formatTime(bestGame6x6.time) }
        : { moves: '-', time: '-' },
      avgMoves4x4,
      avgTime4x4: typeof avgTime4x4 === 'number' ? formatTime(avgTime4x4) : avgTime4x4,
      avgMoves6x6,
      avgTime6x6: typeof avgTime6x6 === 'number' ? formatTime(avgTime6x6) : avgTime6x6
    };
  };
  
  const stats = calculateStats();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">My Profile</h1>
        
        {/* User info */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-4">
            <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mr-4">
              {user?.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
              <p className="text-gray-600">{user?.email}</p>
            </div>
          </div>
          
          <p className="text-gray-600">
            Member since: {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
          </p>
        </div>
        
        {/* Error message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        {/* Game stats */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Game Statistics</h2>
          
          {loading ? (
            <p className="text-center text-gray-600">Loading statistics...</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-100 p-4 rounded-lg text-center">
                  <h3 className="text-lg font-bold text-gray-700 mb-2">Games Played</h3>
                  <p className="text-2xl font-bold text-primary">{stats.gamesPlayed}</p>
                </div>
                
                <div className="bg-gray-100 p-4 rounded-lg text-center">
                  <h3 className="text-lg font-bold text-gray-700 mb-2">Best Score (4x4)</h3>
                  <p className="text-xl font-bold text-primary">
                    {stats.bestScore4x4.moves} moves
                  </p>
                  <p className="text-gray-600">Time: {stats.bestScore4x4.time}</p>
                </div>
                
                <div className="bg-gray-100 p-4 rounded-lg text-center">
                  <h3 className="text-lg font-bold text-gray-700 mb-2">Best Score (6x6)</h3>
                  <p className="text-xl font-bold text-primary">
                    {stats.bestScore6x6.moves} moves
                  </p>
                  <p className="text-gray-600">Time: {stats.bestScore6x6.time}</p>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Board Size
                      </th>
                      <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Avg. Moves
                      </th>
                      <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Avg. Time
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                        4x4 Grid
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 text-center">
                        {stats.avgMoves4x4}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 text-center">
                        {stats.avgTime4x4}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                        6x6 Grid
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 text-center">
                        {stats.avgMoves6x6}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 text-center">
                        {stats.avgTime6x6}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
        
        {/* Game history */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Game History</h2>
          
          {loading ? (
            <p className="text-center text-gray-600">Loading game history...</p>
          ) : gameHistory.length === 0 ? (
            <p className="text-center text-gray-600">You haven't completed any games yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Board Size
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Moves
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {gameHistory.map((game) => (
                    <tr key={game._id}>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(game.completedAt)}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                        {game.boardSize}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                        {game.moves}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                        {formatTime(game.time)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 