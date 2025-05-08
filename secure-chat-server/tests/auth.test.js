const request = require('supertest');
const app = require('../index');
const mongoose = require('mongoose');
const User = require('../models/user');

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/secure-chat');
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('Authentication Tests', () => {
  const testUser = {
    username: 'testuser',
    password: 'Test@123',
    publicKey: 'samplePublicKey123'
  };

  it('should register a new user', async () => {
    const res = await request(app).post('/api/auth/register').send(testUser);
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('User registered successfully');
  });

  it('should not allow duplicate registration', async () => {
    const res = await request(app).post('/api/auth/register').send(testUser);
    expect(res.statusCode).toBe(409);
    expect(res.body.error).toBe('Username already exists');
  });

  it('should login with correct credentials', async () => {
    const res = await request(app).post('/api/auth/login').send({
      username: testUser.username,
      password: testUser.password
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.publicKey).toBe(testUser.publicKey);
  });

  it('should reject login with wrong password', async () => {
    const res = await request(app).post('/api/auth/login').send({
      username: testUser.username,
      password: 'wrongPassword'
    });
    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe('Invalid credentials');
  });
});
