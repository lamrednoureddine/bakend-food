const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Your User model
router.get('/',async (req, res) => {
  try {
    const users = await User.find(); // Fetches all users from MongoDB.
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
 }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndRemove(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully', deletedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while deleting user', error });
  }
});
module.exports = router;
