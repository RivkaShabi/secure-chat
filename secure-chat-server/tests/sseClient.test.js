const axios = require('axios');
const { EventSource } = require('eventsource');

const createClient = require('./sseClient.js');

jest.mock('axios');

describe('SSE Client Tests', () => {
  let mockSendMessage;

  beforeAll(() => {
    mockSendMessage = axios.post.mockResolvedValue({ data: 'success' });
  });

  afterEach(() => {
    jest.clearAllMocks(); 
  });

  it('should send and receive messages correctly', (done) => {
    const clients = [];
    
    for (let i = 1; i <= 3; i++) {
      const client = createClient(i);
      clients.push(client);
    }

    const es = new EventSource('https://localhost:3001/messages/events');
    
    es.onmessage = (event) => {
      console.log('Received:', event.data);
      expect(event.data).toBeDefined();
      done();
    };
    
    es.onerror = (err) => {
      console.log('SSE error:', err);
      done();
    };

    setTimeout(() => {
      expect(mockSendMessage).toHaveBeenCalledTimes(3);
    }, 3000);
  });
});
