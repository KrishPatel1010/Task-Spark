import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      variant="ghost"
      size="sm"
      className={`rounded-xl p-2 shadow-md transition-all duration-300 focus:ring-2 focus:ring-[hsl(var(--neon-blue))] focus:ring-offset-2
        ${isDark
          ? 'text-[hsl(var(--neon-yellow))] hover:text-[hsl(var(--neon-blue))] hover:bg-white/10 drop-shadow-[0_0_8px_hsl(var(--neon-blue)/0.5)]'
          : 'text-[hsl(var(--neon-blue))] hover:text-[hsl(var(--neon-purple))] hover:bg-gray-100 drop-shadow-[0_0_8px_hsl(var(--neon-purple)/0.3)]'}
      `}
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </Button>
  );
};

export default ThemeToggle;
