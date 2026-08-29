const express = require('express');
const { getProfile, updateProfile, discoverPeers } = require('../controllers/user.controller');
const protect = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/me', protect, getProfile);
router.patch('/me', protect, updateProfile);
router.get('/discover', protect, discoverPeers);

module.exports = router;