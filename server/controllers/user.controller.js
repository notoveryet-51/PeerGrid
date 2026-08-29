const User = require('../models/User.model');

// Helper to compute profile completion percentage
const calculateCompletion = (user) => {
  let score = 0;
  if (user.name && user.email) score += 15; // Basic info
  if (user.academic?.institution && user.academic?.degree) score += 20; // Academic
  if (user.skills?.length >= 3) score += 25; // Skills
  if (user.interests?.length >= 1 && user.goals?.length >= 1) score += 20; // Interests & Goals
  if (user.bio) score += 10; // Bio
  if (user.portfolio?.length >= 1) score += 10; // Portfolio
  return Math.min(100, score);
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    Object.assign(user, updates);
    user.profileCompletion = calculateCompletion(user);
    await user.save();

    const sanitizedUser = await User.findById(user._id).select('-password');
    res.json(sanitizedUser);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.discoverPeers = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const peers = await User.find({
      _id: { $ne: currentUserId },
      'privacy.isProfilePublic': true,
    })
      .select('-password')
      .limit(20);

    res.json(peers);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};