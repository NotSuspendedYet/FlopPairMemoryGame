const express = require('express');
const router = express.Router();
const Game = require('../models/Game');

// @route   GET /api/leaderboard
// @desc    Get leaderboard data
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Get query parameters
    const { boardSize = '4x4', limit = 10 } = req.query;
    
    // Find the best scores (lowest moves, then fastest time)
    const leaderboard = await Game.find({ boardSize })
      .sort({ moves: 1, time: 1 })
      .limit(parseInt(limit))
      .populate('user', 'name');

    res.json({
      success: true,
      count: leaderboard.length,
      data: leaderboard
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// @route   GET /api/leaderboard/user/:userId
// @desc    Get user's best scores
// @access  Public
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { boardSize = '4x4' } = req.query;

    // Find user's best score (lowest moves, then fastest time)
    const bestScore = await Game.findOne({ 
      user: userId,
      boardSize
    })
      .sort({ moves: 1, time: 1 })
      .populate('user', 'name');

    if (!bestScore) {
      return res.status(404).json({
        success: false,
        message: 'No scores found for this user'
      });
    }

    res.json({
      success: true,
      data: bestScore
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