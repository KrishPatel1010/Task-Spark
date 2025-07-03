
import React from 'react';
import { List, CheckCircle, Clock, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

export type FilterType = 'all' | 'completed' | 'pending';

interface TaskFilterProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  taskCounts: {
    all: number;
    completed: number;
    pending: number;
  };
}

const TaskFilter: React.FC<TaskFilterProps> = ({
  activeFilter,
  onFilterChange,
  taskCounts,
}) => {
  const { isDark } = useTheme();
  
  const filters = [
    {
      key: 'all' as FilterType,
      label: 'All Tasks',
      icon: BarChart3,
      count: taskCounts.all,
      gradient: 'from-neon-blue to-neon-purple',
    },
    {
      key: 'pending' as FilterType,
      label: 'Pending',
      icon: Clock,
      count: taskCounts.pending,
      gradient: 'from-orange-400 to-orange-600',
    },
    {
      key: 'completed' as FilterType,
      label: 'Completed',
      icon: CheckCircle,
      count: taskCounts.completed,
      gradient: 'from-green-400 to-green-600',
    },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {filters.map((filter) => {
        const Icon = filter.icon;
        const isActive = activeFilter === filter.key;
        
        return (
          <Button
            key={filter.key}
            onClick={() => onFilterChange(filter.key)}
            className={`relative flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
              isActive
                ? `bg-gradient-to-r ${filter.gradient} text-white shadow-lg hover:shadow-xl`
                : isDark 
                  ? 'glass text-white/80 hover:text-white hover:bg-white/10'
                  : 'bg-white/20 text-gray-700 hover:text-gray-900 hover:bg-white/30'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="font-medium">{filter.label}</span>
            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
              isActive 
                ? 'bg-white/20 text-white' 
                : isDark
                  ? 'bg-white/10 text-white/70'
                  : 'bg-gray-200 text-gray-600'
            }`}>
              {filter.count}
            </span>
            
            {isActive && (
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
            )}
          </Button>
        );
      })}
    </div>
  );
};

export default TaskFilter;
