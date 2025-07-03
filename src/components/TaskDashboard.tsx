
import React, { useState, useEffect } from 'react';
import { Plus, LogOut, User, Zap, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import TaskFilter, { FilterType } from './TaskFilter';
import { Task } from './TaskItem';

interface TaskDashboardProps {
  username: string;
  onLogout: () => void;
}

const TaskDashboard: React.FC<TaskDashboardProps> = ({ username, onLogout }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem(`tasks_${username}`);
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, [username]);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem(`tasks_${username}`, JSON.stringify(tasks));
  }, [tasks, username]);

  const addTask = (title: string, description: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks([newTask, ...tasks]);
  };

  const toggleComplete = (taskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const editTask = (taskId: string, title: string, description: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, title, description } : task
    ));
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const taskCounts = {
    all: tasks.length,
    completed: tasks.filter(task => task.completed).length,
    pending: tasks.filter(task => !task.completed).length,
  };

  const completionPercentage = tasks.length > 0 ? Math.round((taskCounts.completed / tasks.length) * 100) : 0;

  return (
    <div className="min-h-screen p-4 relative overflow-hidden">
      {/* Floating particles background */}
      <div className="particles">
        {[...Array(15)].map((_, i) => (
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

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="glass rounded-3xl p-6 mb-8 animate-slideInUp">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-aurora-gradient rounded-2xl flex items-center justify-center animate-glow">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-1">
                  Welcome back, {username}! 
                  <span className="ml-2 animate-pulse">✨</span>
                </h1>
                <p className="text-white/70 text-lg">
                  Ready to conquer your tasks today?
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Progress indicator */}
              <div className="glass rounded-xl p-4 text-center">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-neon-blue" />
                  <span className="text-white/80 text-sm font-medium">Progress</span>
                </div>
                <div className="text-2xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                  {completionPercentage}%
                </div>
              </div>

              <Button
                onClick={onLogout}
                variant="ghost"
                className="text-white/60 hover:text-white hover:bg-white/10 rounded-xl px-4 py-2"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="glass rounded-2xl p-6 animate-slideInLeft">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-neon-blue to-neon-purple rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{taskCounts.all}</div>
                <div className="text-white/70">Total Tasks</div>
              </div>
            </div>
          </div>

          <div className="glass rounded-2xl p-6 animate-slideInUp" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">⏳</span>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{taskCounts.pending}</div>
                <div className="text-white/70">Pending</div>
              </div>
            </div>
          </div>

          <div className="glass rounded-2xl p-6 animate-slideInLeft" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">✅</span>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{taskCounts.completed}</div>
                <div className="text-white/70">Completed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="glass rounded-2xl p-6 mb-8 animate-slideInUp" style={{ animationDelay: '0.3s' }}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <TaskFilter
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              taskCounts={taskCounts}
            />
            
            <Button
              onClick={() => setIsFormOpen(true)}
              className="bg-aurora-gradient hover:shadow-lg hover:shadow-neon-purple/25 rounded-xl text-white font-semibold px-8 py-3 transition-all duration-300 transform hover:scale-105 animate-pulse-neon"
            >
              <Plus className="w-5 h-5 mr-2" />
              New Task
            </Button>
          </div>
        </div>

        {/* Task List */}
        <div className="animate-slideInUp" style={{ animationDelay: '0.4s' }}>
          <TaskList
            tasks={tasks}
            activeFilter={activeFilter}
            onToggleComplete={toggleComplete}
            onEditTask={editTask}
            onDeleteTask={deleteTask}
          />
        </div>

        {/* Task Form Modal */}
        <TaskForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onAddTask={addTask}
        />
      </div>
    </div>
  );
};

export default TaskDashboard;
