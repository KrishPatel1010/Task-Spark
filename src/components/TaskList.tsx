import React from 'react';
import { Sparkles, Target, Trophy } from 'lucide-react';
import TaskItem from './TaskItem';
import { Task, FilterType, PriorityType } from '@/types/Task';

interface TaskListProps {
  tasks: Task[];
  activeFilter: FilterType;
  searchTerm: string;
  onToggleComplete: (id: string) => void;
  onEditTask: (id: string, title: string, description: string, dueDate: string, priority: PriorityType, category: string) => void;
  onDeleteTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  activeFilter,
  searchTerm,
  onToggleComplete,
  onEditTask,
  onDeleteTask,
}) => {
  const filteredTasks = tasks.filter((task) => {
    // Filter by completion status
    const statusMatch =
      activeFilter === 'completed' ? task.completed :
        activeFilter === 'pending' ? !task.completed : true;

    // Filter by search term
    const searchMatch = !searchTerm ||
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.category.toLowerCase().includes(searchTerm.toLowerCase());

    return statusMatch && searchMatch;
  });

  // Sort tasks by priority and due date
  const sortedTasks = filteredTasks.sort((a, b) => {
    // First sort by completion status (pending first)
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }

    // Then by priority (high first)
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
    if (priorityDiff !== 0) return priorityDiff;

    // Then by due date (sooner first)
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    if (a.dueDate && !b.dueDate) return -1;
    if (!a.dueDate && b.dueDate) return 1;

    // Finally by creation date (newest first)
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  if (sortedTasks.length === 0) {
    const getEmptyStateContent = () => {
      if (searchTerm) {
        return {
          icon: <Target className="w-10 h-10 text-white" />,
          title: 'No tasks found',
          description: `No tasks match "${searchTerm}". Try a different search term.`
        };
      }

      return {
        icon: activeFilter === 'completed' ? <Trophy className="w-10 h-10 text-white" /> :
          activeFilter === 'pending' ? <Target className="w-10 h-10 text-white" /> :
            <Sparkles className="w-10 h-10 text-white" />,
        title: activeFilter === 'completed' ? 'No completed tasks yet' :
          activeFilter === 'pending' ? 'No pending tasks' :
            'No tasks created yet',
        description: activeFilter === 'completed' ? 'Complete some tasks to see them here! 🎉' :
          activeFilter === 'pending' ? 'All caught up! Great work! ✨' :
            'Create your first task to get started! 🚀'
      };
    };

    const emptyState = getEmptyStateContent();

    return (
      <div className="text-center py-16">
        <div className="glass rounded-3xl p-12 max-w-md mx-auto transition-all duration-500">
          <div className="w-20 h-20 bg-gradient-to-r from-[hsl(var(--neon-purple))] to-[hsl(var(--neon-pink))] rounded-full flex items-center justify-center mx-auto mb-6">
            {emptyState.icon}
          </div>
          <h3 className="text-2xl font-bold mb-4 transition-all duration-500 text-gray-900 dark:bg-gradient-to-r dark:from-[hsl(var(--neon-blue))] dark:to-[hsl(var(--neon-purple))] dark:bg-clip-text dark:text-transparent">
            {emptyState.title}
          </h3>
          <p className="text-gray-800 dark:text-white/80 text-lg transition-all duration-500">
            {emptyState.description}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sortedTasks.map((task, index) => (
        <div
          key={task.id}
          className="animate-slideInUp"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <TaskItem
            task={task}
            onToggleComplete={onToggleComplete}
            onEditTask={onEditTask}
            onDeleteTask={onDeleteTask}
          />
        </div>
      ))}
    </div>
  );
};

export default TaskList;
