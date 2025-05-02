'use client';
import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { useRouter } from 'next/navigation';

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the user is authenticated when the component mounts
  useEffect(() => {
    const auth = localStorage.getItem('auth');
    if (auth) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth');
    setIsAuthenticated(false);  
    router.push('/login');
  };

  return (
    <>
      {isAuthenticated && (
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              My Dashboard
            </Typography>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </Toolbar>
        </AppBar>
      )}

      <Container sx={{ mt: 4 }}>
        {children}
      </Container>
    </>
  );
};

export default BaseLayout;
