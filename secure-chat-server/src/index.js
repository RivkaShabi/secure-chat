const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const fs = require('fs');
const helmet = require('helmet');
const https = require('https');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/messages');

dotenv.config();
const PORT = process.env.PORT_SERVER;
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

mongoose
  .connect(process.env.MONGO_URI || '')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const httpsOptions = {
  key: fs.readFileSync('./certs/key.pem'),
  cert: fs.readFileSync('./certs/cert.pem'),
};

https.createServer(httpsOptions, app).listen(PORT, () => {
  console.log('Secure server running on port', PORT);
});
