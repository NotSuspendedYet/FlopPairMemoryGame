import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface LeaderboardEntry {
  _id: string;
  user: {
    _id: string;
    name: string;
  };
  moves: number;
  time: number;
  boardSize: string;
  completedAt: string;
}

const LeaderboardPage: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [boardSize, setBoardSize] = useState<string>('4x4');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  // Fetch leaderboard data
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/leaderboard?boardSize=${boardSize}&limit=20`);
        setLeaderboard(res.data.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError('Could not load leaderboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [boardSize, API_URL]);

  // Format time (seconds) to mm:ss
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Format date to local date string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Leaderboard</h1>
        
        {/* Board size selector */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              onClick={() => setBoardSize('4x4')}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                boardSize === '4x4'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              4x4 Grid
            </button>
            <button
              onClick={() => setBoardSize('6x6')}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                boardSize === '6x6'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              6x6 Grid
            </button>
          </div>
        </div>
        
        {/* Error message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        {/* Loading indicator */}
        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Loading leaderboard data...</p>
          </div>
        ) : (
          /* Leaderboard table */
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {leaderboard.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">No scores recorded for this grid size yet.</p>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rank
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Player
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Moves
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leaderboard.map((entry, index) => (
                    <tr key={entry._id} className={index < 3 ? 'bg-yellow-50' : ''}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}`}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{entry.user.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{entry.moves}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatTime(entry.time)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(entry.completedAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
        
        {/* Explanation */}
        <div className="mt-6 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-bold text-gray-800 mb-2">Leaderboard Rules</h2>
          <ul className="text-gray-600 space-y-1">
            <li>• Players are ranked first by fewest moves, then by shortest time</li>
            <li>• Only completed games are counted</li>
            <li>• Each grid size has its own leaderboard</li>
            <li>• You must be logged in to appear on the leaderboard</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage; 