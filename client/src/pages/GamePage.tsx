import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import Card from '../components/Card';
import { ReactComponent } from '../simplifyTypes';

// Define card type
interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

function GamePage(): ReactComponent {
  const [boardSize, setBoardSize] = useState<'4x4' | '6x6'>('4x4');
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [timer, setTimer] = useState<number>(0);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const { user, token } = useAuth();
  
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  // Set up game timer
  useEffect(() => {
    let interval: number;
    
    if (isGameStarted && !isGameOver) {
      interval = setInterval(() => {
        setTimer(timer => timer + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isGameStarted, isGameOver]);

  // Check if game is over (all pairs matched)
  useEffect(() => {
    const totalPairs = cards.length / 2;
    if (totalPairs > 0 && matchedPairs === totalPairs) {
      setIsGameOver(true);
      setIsGameStarted(false);
      
      // Save score if user is logged in
      if (user && token) {
        saveGameResult();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchedPairs, cards.length]);

  // Save game result to the backend
  const saveGameResult = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          'x-auth-token': token
        }
      };
      
      await axios.post(`${API_URL}/game/result`, {
        moves,
        time: timer,
        boardSize
      }, config);
    } catch (err) {
      console.error('Error saving game result:', err);
      setErrorMessage('Could not save your score');
    } finally {
      setLoading(false);
    }
  };

  // Initialize game board
  const initializeBoard = (size: '4x4' | '6x6') => {
    setBoardSize(size);
    setMoves(0);
    setTimer(0);
    setMatchedPairs(0);
    setFlippedCards([]);
    setIsGameOver(false);
    setErrorMessage(null);
    
    // Determine grid dimensions
    const gridSize = size === '4x4' ? 16 : 36;
    const numPairs = gridSize / 2;
    
    // Generate pairs of values
    const emojiPool = ['🍎', '🍌', '🍒', '🍊', '🍇', '🍓', '🍉', '🍕', '🍔', '🍟', '🍩', '🍦', '🍭', '🍪', '🥝', '🥥', '🥑', '🥕'];
    const selectedEmojis = emojiPool.slice(0, numPairs);
    
    // Create pairs and shuffle
    const cardValues = [...selectedEmojis, ...selectedEmojis];
    shuffleArray(cardValues);
    
    // Create card objects
    const newCards = cardValues.map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false
    }));
    
    setCards(newCards);
  };

  // Shuffle array helper function
  const shuffleArray = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  // Start a new game
  const startGame = () => {
    initializeBoard(boardSize);
    setIsGameStarted(true);
  };

  // Handle card click
  const handleCardClick = (id: number) => {
    // Ignore clicks if game is over or more than 2 cards are flipped
    if (isGameOver || flippedCards.length >= 2) return;
    
    // Ignore clicks on already flipped or matched cards
    const card = cards.find(c => c.id === id);
    if (!card || card.isFlipped || card.isMatched) return;
    
    // Start the game on first card click
    if (!isGameStarted) {
      setIsGameStarted(true);
    }
    
    // Flip the card and add to flipped cards
    const updatedCards = cards.map(c => 
      c.id === id ? { ...c, isFlipped: true } : c
    );
    setCards(updatedCards);
    
    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);
    
    // If two cards are flipped, check for a match
    if (newFlippedCards.length === 2) {
      setMoves(moves => moves + 1);
      
      const [firstId, secondId] = newFlippedCards;
      const firstCard = updatedCards.find(c => c.id === firstId);
      const secondCard = updatedCards.find(c => c.id === secondId);
      
      if (firstCard?.value === secondCard?.value) {
        // Match found
        setTimeout(() => {
          const matchedCards = updatedCards.map(c => 
            c.id === firstId || c.id === secondId 
              ? { ...c, isMatched: true } 
              : c
          );
          setCards(matchedCards);
          setFlippedCards([]);
          setMatchedPairs(matchedPairs + 1);
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          const resetCards = updatedCards.map(c => 
            c.id === firstId || c.id === secondId 
              ? { ...c, isFlipped: false } 
              : c
          );
          setCards(resetCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // Format time display (mm:ss)
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Calculate grid columns based on board size
  const gridColumns = boardSize === '4x4' ? 'grid-cols-4' : 'grid-cols-6';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Memory Game</h1>
        
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
            <span className="block sm:inline">{errorMessage}</span>
          </div>
        )}
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          {/* Game controls */}
          <div className="mb-4 md:mb-0">
            <div className="flex space-x-2">
              <button
                onClick={() => isGameStarted ? {} : setBoardSize('4x4')}
                className={`px-4 py-2 rounded ${boardSize === '4x4' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'} ${isGameStarted ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'}`}
                disabled={isGameStarted}
              >
                4x4
              </button>
              <button
                onClick={() => isGameStarted ? {} : setBoardSize('6x6')}
                className={`px-4 py-2 rounded ${boardSize === '6x6' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'} ${isGameStarted ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'}`}
                disabled={isGameStarted}
              >
                6x6
              </button>
              <button
                onClick={startGame}
                className="px-4 py-2 bg-secondary hover:bg-cyan-700 text-white rounded"
              >
                {cards.length > 0 ? 'Restart Game' : 'Start Game'}
              </button>
            </div>
          </div>
          
          {/* Game stats */}
          <div className="flex space-x-4 text-lg">
            <div>
              <span className="font-bold text-gray-700">Moves:</span> {moves}
            </div>
            <div>
              <span className="font-bold text-gray-700">Time:</span> {formatTime(timer)}
            </div>
          </div>
        </div>
        
        {/* Game board */}
        {cards.length > 0 ? (
          <div className={`grid ${gridColumns} gap-2 md:gap-4`}>
            {cards.map(card => (
              <Card
                key={card.id}
                id={card.id}
                value={card.value}
                isFlipped={card.isFlipped}
                isMatched={card.isMatched}
                onClick={handleCardClick}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <p className="text-xl text-gray-700 mb-4">
              Select a board size and click "Start Game" to begin!
            </p>
            <p className="text-gray-600">
              Try to match all pairs with the fewest moves in the shortest time.
            </p>
          </div>
        )}
        
        {/* Game over message */}
        {isGameOver && (
          <div className="mt-8 bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-2">Congratulations!</h2>
            <p className="text-lg mb-2">
              You completed the game in <span className="font-bold">{moves} moves</span> and <span className="font-bold">{formatTime(timer)}</span>!
            </p>
            {loading ? (
              <p>Saving your score...</p>
            ) : (
              <button
                onClick={startGame}
                className="mt-2 px-6 py-2 bg-primary hover:bg-indigo-700 text-white rounded transition duration-300"
              >
                Play Again
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default GamePage; 