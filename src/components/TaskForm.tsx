
import React, { useState } from 'react';
import { Plus, X, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface TaskFormProps {
  onAddTask: (title: string, description: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask, isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask(title.trim(), description.trim());
      setTitle('');
      setDescription('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-slideInUp">
      <div className="glass rounded-2xl p-6 max-w-md w-full shadow-2xl animate-slideInUp relative">
        {/* Glowing decoration */}
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-neon-pink rounded-full opacity-40 blur-sm animate-pulse"></div>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg flex items-center justify-center animate-glow">
              <Wand2 className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Create New Task</h2>
          </div>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="text-white/60 hover:text-white hover:bg-white/10 rounded-full p-2"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Task Title *
            </label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              className="bg-glass-white border-white/20 text-white placeholder:text-white/60 rounded-xl focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/50 transition-all duration-300"
              required
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Description (Optional)
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add more details..."
              className="bg-glass-white border-white/20 text-white placeholder:text-white/60 rounded-xl focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/50 transition-all duration-300 resize-none"
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              onClick={onClose}
              variant="ghost"
              className="flex-1 text-white/80 hover:text-white hover:bg-white/10 rounded-xl"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-neon-blue to-neon-purple hover:shadow-lg hover:shadow-neon-blue/25 rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-105"
              disabled={!title.trim()}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Task
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
