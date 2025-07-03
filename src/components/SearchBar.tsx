
import React from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
      <Input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10 pr-10 bg-glass-white border-white/20 text-white placeholder:text-white/60 rounded-xl focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/50 transition-all duration-300"
      />
      {searchTerm && (
        <Button
          onClick={() => onSearchChange('')}
          variant="ghost"
          size="sm"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white p-1"
        >
          <X className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};

export default SearchBar;
