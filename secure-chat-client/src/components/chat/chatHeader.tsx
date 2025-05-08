import { Box, Button, Typography } from '@mui/material';
import { ChatHeaderProps } from '../../interfaces/interface';
import { useUser } from '../user';

export default function ChatHeader({ onFetchHistory }: ChatHeaderProps) {
  const { currentUsername } = useUser();

  return (
    <Box className='chat-header' alignItems='center' padding='0.5rem'>
      <Typography variant='h6' className='chat-username'>
        Welcome, {currentUsername}
      </Typography>
      <Button variant='outlined' size='small' onClick={onFetchHistory}>
        Get Messages from Last Hour
      </Button>
    </Box>
  );
}
