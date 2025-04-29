import React from 'react';
import './Card.css';

interface CardProps {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: (id: number) => void;
}

const Card = ({ id, emoji, isFlipped, isMatched, onClick }: CardProps) => {
  const cardClassName = `card ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`;

  return (
    <div className={cardClassName} onClick={() => onClick(id)}>
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