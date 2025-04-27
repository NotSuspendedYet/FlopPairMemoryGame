const express = require('express');
const router = express.Router();
const Game = require('../models/Game');
const jwt = require('jsonwebtoken');

// Middleware to protect routes
const protect = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if no token
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'No token, authorization denied' 
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ 
      success: false, 
      message: 'Token is not valid' 
    });
  }
};

// @route   POST /api/game/result
// @desc    Save game result
// @access  Private
router.post('/result', protect, async (req, res) => {
  try {
    const { moves, time, boardSize } = req.body;

    // Create new game result
    const game = await Game.create({
      user: req.userId,
      moves,
      time,
      boardSize
    });

    res.status(201).json({
      success: true,
      data: game
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// @route   GET /api/game/history
// @desc    Get user's game history
// @access  Private
router.get('/history', protect, async (req, res) => {
  try {
    const games = await Game.find({ user: req.userId })
      .sort({ completedAt: -1 });

    res.json({
      success: true,
      count: games.length,
      data: games
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

module.exports = router; 