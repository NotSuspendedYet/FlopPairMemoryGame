import React from 'react';
import './Card.css';

interface CardProps {
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

const Card = ({ emoji, isFlipped, isMatched, onClick }: CardProps) => {
  const cardClassName = `card ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`;

  return (
    <div className={cardClassName} onClick={onClick}>
      <div className="card-inner">
        <div className="card-front">
          ?
        </div>
        <div className="card-back">
          {emoji}
        </div>
      </div>
    </div>
  );
};

export default Card; 