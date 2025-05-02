import React from 'react';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <aside style={{
      width: '250px',
      height: '100vh',
      backgroundColor: '#f4f4f4',
      padding: '20px',
      boxSizing: 'border-box',
      borderRight: '1px solid #ddd',
      position: 'fixed',
      top: 0,
      left: 0,
      overflowY: 'auto'
    }}>
      <nav>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li style={{ marginBottom: '15px' }}>
            <Link href="/dashboard">
              <a style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>Dashboard</a>
            </Link>
          </li>
          <li style={{ marginBottom: '15px' }}>
            <Link href="/login">
              <a style={{ textDecoration: 'none', color: '#333' }}>Login</a>
            </Link>
          </li>
          {/* Add more sidebar links here */}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
