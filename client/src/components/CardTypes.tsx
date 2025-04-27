import React from 'react';

export interface CardProps {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: (id: number) => void;
  key?: number;
} 