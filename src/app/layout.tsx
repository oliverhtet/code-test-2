// src/app/layout.tsx
'use client';
import React from 'react';
import { Provider } from 'react-redux';
import store from '../store/store';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
    <Provider store={store}>
      <div>
        <main>{children}</main>
      </div>
    </Provider>
    </body>
    </html>
  );
};

export default Layout;
