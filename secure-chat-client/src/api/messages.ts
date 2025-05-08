import axios from 'axios';
import { API_URL } from '../config';

export const sendMessage = async (token: string, encryptedText: string) => {
  try {
    await axios.post(
      `${API_URL}/api/messages/send`,
      { encryptedContent: encryptedText },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

// This function fetches messages from the last hour
export const fetchRecentMessages = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/api/messages/history`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error('Failed to fetch recent messages:', error);
  }
};
