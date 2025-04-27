import React from 'react';
import { CardProps } from './CardTypes';
import { ReactComponent } from '../simplifyTypes';

function Card({ id, value, isFlipped, isMatched, onClick }: CardProps): ReactComponent {
  return (
    <div 
      className={`card ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`}
      onClick={() => onClick(id)}
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
}

export default Card; 