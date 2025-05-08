import { Box, Paper } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchRecentMessages } from '../../api/messages';
import { API_URL } from '../../config';
import { MessageType } from '../../interfaces/interface';
import { decryptMessage } from '../../utils/crypto';
import { useUser } from '../user';
import ChatHeader from './chatHeader';
import ChatInput from './chatInput';
import ChatMessages from './chatMessages';
import './chatStyles.css';

export default function Chat() {
  const [messages, setMessages] = useState<{ sender: string; message: string }[]>([]);
  const { currentUsername } = useUser();
  const token = localStorage.getItem(`${currentUsername}_jwt`) || '';
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFetchHistory = async () => {
    const dataHistory = await fetchRecentMessages(token);
    if (!dataHistory) return;
    const decryptedMessages = dataHistory.map((msg: MessageType) => ({
      sender: msg.sender,
      message: decryptMessage(msg.encryptedContent),
    }));
    setMessages(decryptedMessages);
  };

  useEffect(() => {
    if (!currentUsername) {
      navigate('/');
      return;
    }

    const eventSource = new EventSource(`${API_URL}/api/messages/events`);
    eventSource.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      const decrypted = { sender: msg.sender, message: decryptMessage(msg.encryptedContent) };
      setMessages((prev) => [...prev, decrypted]);
      scrollToBottom();
    };

    eventSource.onerror = () => {
      console.error('Error with message events.');
    };

    return () => {
      eventSource.close();
    };
  }, [currentUsername, navigate]);

  return (
    <Box className='chat-container'>
      <Paper className='chat-box' elevation={3}>
        <ChatHeader onFetchHistory={handleFetchHistory} />
        <ChatMessages messages={messages} messagesEndRef={messagesEndRef} />
        <ChatInput />
      </Paper>
    </Box>
  );
}
