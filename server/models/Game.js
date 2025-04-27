const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  moves: {
    type: Number,
    required: [true, 'Number of moves is required'],
    min: 0
  },
  time: {
    type: Number,
    required: [true, 'Time taken is required'],
    min: 0
  },
  boardSize: {
    type: String,
    required: [true, 'Board size is required'],
    enum: ['4x4', '6x6']
  },
  completedAt: {
    type: Date,
    default: Date.now
  }
});

// Create compound index for leaderboard sorting
GameSchema.index({ boardSize: 1, moves: 1, time: 1 });

module.exports = mongoose.model('Game', GameSchema); 