const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password, publicKey } = req.body;

  // Check if the request body contains the required fields
  if (!username || !password || !publicKey) {
    console.log('Registration failed: Missing fields.');
    return res.status(400).json({ error: 'Missing fields' });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    console.log(`Registration failed: Username "${username}" already exists.`);
    return res.status(409).json({ error: 'Username already exists' });
  }

  // Hash the password before saving it to the database
  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = new User({ username, passwordHash, publicKey });

  // Save the new user to the database
  await newUser.save();

  console.log(`User "${username}" registered successfully.`);
  res.status(201).json({ message: 'User registered successfully' });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    console.log(`Login failed: Username "${username}" not found.`);
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Compare the provided password with the hashed password in the database
  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    console.log(`Login failed: Incorrect password for username "${username}".`);
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Generate a JWT token for the user
  // The token will contain the user's ID and username as payload
  const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  console.log(`User "${username}" logged in successfully.`);
  res.json({ token, publicKey: user.publicKey });
});

module.exports = router;
