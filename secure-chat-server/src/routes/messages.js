const express = require('express');
const { authenticate } = require('../middlewares/authenticate');
const Message = require('../models/message');

const router = express.Router();

// Array to store connected clients for Server-Sent Events (SSE)
let clients = [];

// Route to send a new message
router.post('/send', authenticate, async (req, res) => {
  const { encryptedContent } = req.body;
  const sender = req.user.username;

  if (!encryptedContent) {
    console.log('Message sending failed: Missing message content.');
    return res.status(400).json({ error: 'Missing message' });
  }

  const message = new Message({ sender, encryptedContent });
  await message.save();
  console.log(`Message from "${sender}" saved successfully.`);

  // Notify all connected clients
  clients.forEach((client) => {
    client.write(`data: ${JSON.stringify(message)}\n\n`);
  });
  console.log(`Message from "${sender}" sent to ${clients.length} clients.`);

  res.status(201).json({ message: 'Message sent' });
});

// Route to handle Server-Sent Events (SSE) for real-time updates
router.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Cache-Control', 'no-cache');

  clients.push(res); // Add the client to the list
  console.log('New client connected for SSE.');

  req.on('close', () => {
    clients = clients.filter((client) => client !== res);
    console.log('Client disconnected from SSE.');
  });
});

// Route to fetch message history from the last hour
router.get('/history', authenticate, async (req, res) => {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

  console.log('Fetching message history from the last hour.');
  const messages = await Message.find({
    createdAt: { $gte: oneHourAgo },
  });

  console.log(`Fetched ${messages.length} messages from the last hour.`);
  res.json(messages);
});

module.exports = router;
