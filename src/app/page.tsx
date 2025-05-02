// src/app/page.tsx

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const HomePage = () => {
  const router = useRouter();
  const  user = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, [user,router]);

  return null; // We don't render anything on this page
};

export default HomePage;
