import React from 'react';
import { Outlet } from 'react-router-dom';

// This layout will be used specifically for the login and register pages
const MinimalLayout = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Outlet /> {/* This is where the content for the login/register page will go */}
    </div>
  );
};

export default MinimalLayout;
