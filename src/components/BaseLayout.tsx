// src/components/BaseLayout.tsx
'use client';
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { useRouter } from 'next/navigation';

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('username');
    router.push('/login');
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Dashboard
          </Typography>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        {children}
      </Container>
    </>
  );
};

export default BaseLayout;
