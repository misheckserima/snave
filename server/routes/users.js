const express = require('express');
const User = require('../models/User');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get all users (admin functionality)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const users = await User.getAllUsers(limit, offset);
    const stats = await User.getUserStats();

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          page,
          limit,
          total: parseInt(stats.total_users)
        },
        stats
      }
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching users'
    });
  }
});

// Get user statistics
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    const stats = await User.getUserStats();
    
    res.json({
      success: true,
      data: {
        totalUsers: parseInt(stats.total_users),
        newUsersThisMonth: parseInt(stats.new_users_this_month)
      }
    });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user statistics'
    });
  }
});

module.exports = router;