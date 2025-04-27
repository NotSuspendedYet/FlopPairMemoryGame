import React from 'react';
import { CardProps } from './CardTypes';

const Card: React.FC<CardProps> = ({ id, value, isFlipped, isMatched, onClick }) => {
  return (
    <div 
      className={`card ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`}
      onClick={onClick}
    >
      <div className="card-inner">
        <div className="card-front">
          ?
        </div>
        <div className="card-back">
          {value}
        </div>
      </div>
    </div>
  );
};

export default Card; 