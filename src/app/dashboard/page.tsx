'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayers } from '../../store/playersSlice';
import PlayerList from '../../components/PlayerList';
import TeamList from '../../components/TeamList';
import { useRouter } from 'next/navigation';
import type { RootState } from '../../store/store';
import BaseLayout from '../../components/BaseLayout';
import { Typography } from '@mui/material';

const Dashboard = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const username = useSelector((state: RootState) => state.auth?.userName);
  const [perPage, setPerPage] = useState(10);
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUserName(username);
  }, [username]);

  useEffect(() => {
    if (!username) {
      router.push('/login');
    }
  }, [router, username]);

  const fetchPlayers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.balldontlie.io/epl/v1/players?season=2024&per_page=${perPage}`,
        {
          headers: {
            'Authorization': 'Bearer 3d2c8118-0f14-43cf-bc60-3b93c63bf35e',
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      dispatch(setPlayers(data.data || []));
    } catch (error) {
      console.error('Error fetching players:', error);
    }
    setLoading(false);
  }, [dispatch, perPage]);

  useEffect(() => {
    fetchPlayers();
  }, [fetchPlayers]);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;
      if (bottom && !loading) {
        setPerPage(prev => prev + 10); 
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  return (
    <BaseLayout>
      <Typography variant="h5" gutterBottom>
        {userName ? `Welcome, ${userName}` : 'Welcome, Guest'}
      </Typography>
      <TeamList />
      <PlayerList />
          {loading && <Typography variant="body2">Loading more players...</Typography>}
      <hr />
      
    </BaseLayout>
  );
};

export default Dashboard;
