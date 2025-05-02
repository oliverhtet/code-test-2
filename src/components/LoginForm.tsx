'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '@/store/authSlice';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      dispatch(login(username));
      localStorage.setItem('user', username);
      router.push('/dashboard');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
        className="mb-4 p-2 border"
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
