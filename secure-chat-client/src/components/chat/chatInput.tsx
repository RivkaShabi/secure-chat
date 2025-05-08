import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { sendMessage } from '../../api/messages';
import { encryptMessage } from '../../utils/crypto';
import { useUser } from '../user';

export default function ChatInput() {
  const [input, setInput] = useState('');
  const { currentUsername } = useUser();
  const token = localStorage.getItem(`${currentUsername}_jwt`) || '';

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    const encrypted = encryptMessage(input);
    await sendMessage(token, encrypted);
    setInput('');
  };

  return (
    <Box className='chat-input-area'>
      <TextField
        variant='outlined'
        placeholder='Type a message...'
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSendMessage();
        }}
      />
      <Button
        onClick={handleSendMessage}
        variant='contained'
        color='primary'
        style={{ marginLeft: '0.5rem' }}
      >
        Send
      </Button>
    </Box>
  );
}
