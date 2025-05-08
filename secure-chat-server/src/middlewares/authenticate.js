const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  // Extract the token from the Authorization header
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    console.log('Authentication failed: No token provided.');
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded user data to the request object
    console.log('Authentication successful.');
    next();
  } catch (err) {
    console.error('Authentication failed: Invalid token.');
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = { authenticate };
