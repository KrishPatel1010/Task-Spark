import React, { useState } from 'react';
import { User, LogIn, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LoginProps {
  onLogin: (username: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating particles background */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
            }}
          />
        ))}
      </div>

      {/* Main login container */}
      <div className="glass rounded-3xl p-8 md:p-12 max-w-md w-full shadow-2xl animate-slideInUp relative">
        {/* Glowing orb decoration */}
        <div className="absolute -top-12 -right-12 w-24 h-24 bg-neon-purple rounded-full opacity-20 blur-xl animate-pulse-neon"></div>
        <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-neon-blue rounded-full opacity-20 blur-lg animate-float"></div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 bg-aurora-gradient rounded-full flex items-center justify-center mb-6">
            <Sparkles className="w-10 h-10 text-black dark:text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent mb-2">
            TaskSpark
          </h1>
          <p className="text-gray-800 dark:text-white/80 text-lg">Your Personal Task Universe</p>
        </div>

        {/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-white/60 w-5 h-5" />
            <Input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="pl-12 h-14 bg-glass-white border-white/20 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-white/60 rounded-xl text-lg focus:border-neon-purple focus:ring-2 focus:ring-neon-purple/50 transition-all duration-300"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full h-14 bg-aurora-gradient hover:shadow-lg hover:shadow-neon-purple/25 rounded-xl text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105"
            disabled={!username.trim()}
          >
            <LogIn className="w-5 h-5 mr-2" />
            Enter TaskSpark
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 dark:text-white/60 text-sm">
            Ready to organize your tasks in style? ✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
