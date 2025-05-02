'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { login } from '../../store/authSlice';
import { Button, TextField, Typography, Container, Box } from '@mui/material';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = () => {
    if (!username.trim()) {
      alert('Username required');
      return;
    }
    dispatch(login(username));
    router.push('/dashboard');
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>

        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          fullWidth
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
}
