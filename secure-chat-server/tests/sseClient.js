const { EventSource } = require('eventsource');
const axios = require('axios');

const token = "efrffs";

function createClient(index) {
  const es = new EventSource(`https://localhost:3001/messages/events`, {
    rejectUnauthorized: false,
  });

  es.onmessage = (event) => {
    console.log(`[Client ${index}] Received:`, event.data);
  };

  es.onerror = (err) => {
    console.error(`[Client ${index}] SSE error:`, err);
  };

  setTimeout(async () => {
    try {
      await axios.post(
        'https://localhost:3001/messages/send',
        { encryptedContent: `Hello from client ${index}` },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false }),
        }
      );
    } catch (err) {
      console.error(`[Client ${index}] Failed to send message`, err.response?.data || err.message);
    }
  }, 1000 * index);
}

for (let i = 1; i <= 3; i++) {
  createClient(i);
}
