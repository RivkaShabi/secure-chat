import { Box, Typography } from '@mui/material';
import { ChatMessagesProps } from '../../interfaces/interface';

export default function ChatMessages({ messages, messagesEndRef }: ChatMessagesProps) {
  return (
    <Box className='chat-messages' style={{ overflowY: 'auto', maxHeight: '400px' }}>
      {messages.map((msg, i) => (
        <Typography key={i} className='chat-message' variant='body2'>
          {msg.message || ' '} <span className='chat-sender'>({msg.sender})</span>
        </Typography>
      ))}
      <div ref={messagesEndRef} />
    </Box>
  );
}
