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
    <div className="flex flex-row items-center gap-2 justify-center">
      {(['all', 'completed', 'pending'] as FilterType[]).map((filter) => (
        <button
          key={filter}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--neon-blue))] focus:ring-offset-2
            ${activeFilter === filter
              ? 'bg-[hsl(var(--neon-blue))] text-black dark:bg-[hsl(var(--neon-purple))] dark:text-white'
              : 'bg-transparent text-gray-600 dark:text-gray-300 hover:bg-[hsl(var(--neon-blue)/0.1)] dark:hover:bg-[hsl(var(--neon-purple)/0.1)]'}
          `}
          onClick={() => onFilterChange(filter)}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
          {taskCounts[filter] !== undefined && (
            <span className="ml-2 text-xs font-normal opacity-70">({taskCounts[filter]})</span>
          )}
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;
