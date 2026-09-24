const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  const { name, role } = req.body;
  
  if (!name || !role) {
    return res.status(400).json({ message: 'Name and role are required' });
  }

  // Mock a user profile in memory
  const mockUser = {
    id: `mock-${Date.now()}`,
    name,
    role,
    xp: role === 'student' ? 1250 : undefined,
    streak: role === 'student' ? 7 : undefined,
    level: role === 'student' ? 5 : undefined
  };

  // Mock JWT token
  const token = 'mock-jwt-token-xyz-123';

  res.json({ user: mockUser, token });
});

module.exports = router;
