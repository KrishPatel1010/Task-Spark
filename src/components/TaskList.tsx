
import React from 'react';
import { Sparkles, Target, Trophy } from 'lucide-react';
import TaskItem, { Task } from './TaskItem';
import { FilterType } from './TaskFilter';

interface TaskListProps {
  tasks: Task[];
  activeFilter: FilterType;
  onToggleComplete: (id: string) => void;
  onEditTask: (id: string, title: string, description: string) => void;
  onDeleteTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  activeFilter,
  onToggleComplete,
  onEditTask,
  onDeleteTask,
}) => {
  const filteredTasks = tasks.filter((task) => {
    if (activeFilter === 'completed') return task.completed;
    if (activeFilter === 'pending') return !task.completed;
    return true;
  });

  if (filteredTasks.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="glass rounded-3xl p-12 max-w-md mx-auto animate-float">
          <div className="w-20 h-20 bg-gradient-to-r from-neon-purple to-neon-pink rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-neon">
            {activeFilter === 'completed' ? (
              <Trophy className="w-10 h-10 text-white" />
            ) : activeFilter === 'pending' ? (
              <Target className="w-10 h-10 text-white" />
            ) : (
              <Sparkles className="w-10 h-10 text-white" />
            )}
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">
            {activeFilter === 'completed' && 'No completed tasks yet'}
            {activeFilter === 'pending' && 'No pending tasks'}
            {activeFilter === 'all' && 'No tasks created yet'}
          </h3>
          <p className="text-white/70 text-lg">
            {activeFilter === 'completed' && 'Complete some tasks to see them here! 🎉'}
            {activeFilter === 'pending' && 'All caught up! Great work! ✨'}
            {activeFilter === 'all' && 'Create your first task to get started! 🚀'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredTasks.map((task, index) => (
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
