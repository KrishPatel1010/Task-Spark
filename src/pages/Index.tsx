
import React, { useState, useEffect } from 'react';
import Login from '@/components/Login';
import TaskDashboard from '@/components/TaskDashboard';

const Index = () => {
  const [username, setUsername] = useState<string | null>(null);

  // Check for existing login on component mount
  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  const handleLogin = (user: string) => {
    localStorage.setItem('username', user);
    setUsername(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    setUsername(null);
  };

  if (!username) {
    return <Login onLogin={handleLogin} />;
  }

  return <TaskDashboard username={username} onLogout={handleLogout} />;
};

export default Index;
