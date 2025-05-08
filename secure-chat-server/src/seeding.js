const mongoose = require('mongoose');
const User = require('./models/user');
const Message = require('./models/message');
const bcrypt = require('bcrypt');
const {encryptMessage} = require('./utils/crypto');

// Mock Data
const usersData = [
  {
    username: 'Rivka  Blais',
    passwordHash: 'password1',
    publicKey: 'publicKey1',
  },
  {
    username: 'Samson  McKenzie',
    passwordHash: 'password2',
    publicKey: 'publicKey2',
  },
  {
    username: 'Alva  McKenzie',
    passwordHash: 'password3',
    publicKey: 'publicKey3',
  },
];

const messagesData = [
  {
    sender: 'Rivka  Blais',
    encryptedContent: 'encrypted message 1',
  },
  {
    sender: 'Samson  McKenzie',
    encryptedContent: 'encrypted message 2',
  },
  {
    sender: 'Alva  McKenzie',
    encryptedContent: 'encrypted message 3',
  },
  {
    sender: 'Rivka  Blais',
    encryptedContent: 'encrypted message 4',
  },
  {
    sender: 'Samson  McKenzie',
    encryptedContent: 'encrypted message 5',
  },
  {
    sender: 'Alva  McKenzie',
    encryptedContent: 'encrypted message 6',
  },
  {
    sender: 'Rivka  Blais',
    encryptedContent: 'encrypted message 7',
  },
  {
    sender: 'Samson  McKenzie',
    encryptedContent: 'encrypted message 8',
  },
  {
    sender: 'Alva  McKenzie',
    encryptedContent: 'encrypted message 9',
  },
];

const seedUsers = async () => {
  for (let user of usersData) {
    const salt = await bcrypt.genSalt(10);
    user.passwordHash = await bcrypt.hash(user.passwordHash, salt);

    const existingUser = await User.findOne({ username: user.username });
    if (!existingUser) {
      const newUser = new User(user);
      await newUser.save();
      console.log(`User ${user.username} added to the database.`);
    } else {
      console.log(`User ${user.username} already exists.`);
    }
  }
};

const seedMessages = async () => {
  for (let message of messagesData) {
    console.log(message.encryptedContent);
    
    const encrypted = encryptMessage(message.encryptedContent);
    const newMessage = new Message({
      sender: message.sender,
      encryptedContent: encrypted,
    });
    await newMessage.save();
    console.log(`Message from ${message.sender} added to the database.`);
  }
};

const runSeed = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/secure-chat', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB.');

    await seedUsers();
    await seedMessages();

    console.log('Seeding completed.');

    mongoose.disconnect();
  } catch (error) {
    console.error('Error during seeding:', error);
  }
};

runSeed();
