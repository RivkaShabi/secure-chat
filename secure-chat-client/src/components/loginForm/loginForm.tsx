import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../../api/auth';
import { generateRSAKeys } from '../../utils/crypto';
import { useUser } from '../user';
import './loginFormStyles.css';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { setCurrentUsername } = useUser();

  // Handle login process
  const handleLogin = async () => {
    console.log('Attempting to log in...');
    const { publicKey, privateKey } = await generateRSAKeys();
    try {
      // Send the login request to the server
      const { message, token, status } = await login(username, password, publicKey);
      if (status !== 200) {
        throw new Error(message);
      }
      console.log('Login successful.');
      localStorage.setItem(`${username}_jwt`, token);
      localStorage.setItem(`${username}_privateKey`, privateKey);
      setCurrentUsername(username);
      // Redirect to the chat page after successful login
      navigate('/chat');
    } catch (error: any) {
      console.error('Login failed:', error.message);
      setErrorMessage(error.message || 'Login failed');
    }
  };

  // Handle registration process
  const handleRegister = async () => {
    console.log('Attempting to register...');
    try {
      setErrorMessage('');
      const { publicKey } = await generateRSAKeys();
      // Send the registration request to the server
      const { status, message } = await register(username, password, publicKey);
      if (status !== 201) {
        throw new Error(message);
      }
      console.log('Registration successful.');
      alert('Registration successful! You can now log in.');
      setIsRegisterMode(false);
    } catch (error: any) {
      console.error('Registration failed:', error.message);
      setErrorMessage(error.message || 'Registration failed');
    }
  };

  return (
    <Box className='login-wrapper'>
      <Card className='login-card' elevation={3}>
        <CardContent>
          <Typography variant='h5' component='div' gutterBottom>
            {isRegisterMode ? 'Register' : 'Login'}
          </Typography>
          <TextField
            label='Username'
            fullWidth
            margin='normal'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label='Password'
            type='password'
            fullWidth
            margin='normal'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMessage && (
            <Typography
              variant='body2'
              color='error'
              style={{ marginTop: '0.5rem', textAlign: 'center' }}
            >
              {errorMessage}
            </Typography>
          )}
          <Button
            variant='contained'
            color='primary'
            fullWidth
            onClick={isRegisterMode ? handleRegister : handleLogin}
            style={{ marginTop: '1rem' }}
          >
            {isRegisterMode ? 'Register' : 'Login'}
          </Button>
          <Button
            fullWidth
            onClick={() => {
              setIsRegisterMode(!isRegisterMode);
              setErrorMessage(''); // Clear error message when switching modes
            }}
            style={{ marginTop: '0.5rem' }}
          >
            {isRegisterMode ? 'Back to Login' : 'New User?'}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}