import React from 'react';
import './Card.css';

interface CardProps {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: (id: number) => void;
  key?: number | string;
}

const Card = ({ id, emoji, isFlipped, isMatched, onClick }: CardProps) => {
  const cardClassName = `card ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`;

  return (
    <div className={cardClassName} onClick={() => onClick(id)}>
      <div className="card-inner">
        <div className="card-front">
          <span className="question-mark">?</span>
        </div>
        <div className="card-back">
          <span className="emoji">{emoji}</span>
        </div>
      </div>
    </div>
  );
};

export default Card; 