
import React, { useState } from 'react';
import { Check, Edit, Trash2, Clock, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onEditTask: (id: string, title: string, description: string) => void;
  onDeleteTask: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleComplete,
  onEditTask,
  onDeleteTask,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);

  const handleSaveEdit = () => {
    if (editTitle.trim()) {
      onEditTask(task.id, editTitle.trim(), editDescription.trim());
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditTitle(task.title);
    setEditDescription(task.description);
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`glass rounded-2xl p-6 transition-all duration-500 hover:shadow-lg hover:shadow-neon-blue/10 animate-slideInLeft group ${
      task.completed ? 'opacity-75' : ''
    }`}>
      {/* Completion indicator */}
      <div className="flex items-start gap-4">
        <Button
          onClick={() => onToggleComplete(task.id)}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
            task.completed
              ? 'bg-gradient-to-r from-green-400 to-green-600 border-green-400 shadow-lg shadow-green-400/25'
              : 'border-white/30 hover:border-neon-blue hover:shadow-lg hover:shadow-neon-blue/25 bg-transparent'
          }`}
          size="sm"
        >
          {task.completed && <Check className="w-4 h-4 text-white" />}
        </Button>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-3">
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="bg-glass-white border-white/20 text-white placeholder:text-white/60 rounded-lg"
                autoFocus
              />
              <Textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Description..."
                className="bg-glass-white border-white/20 text-white placeholder:text-white/60 rounded-lg resize-none"
                rows={2}
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleSaveEdit}
                  size="sm"
                  className="bg-gradient-to-r from-green-400 to-green-600 hover:shadow-lg hover:shadow-green-400/25 rounded-lg text-white"
                >
                  Save
                </Button>
                <Button
                  onClick={handleCancelEdit}
                  size="sm"
                  variant="ghost"
                  className="text-white/60 hover:text-white hover:bg-white/10 rounded-lg"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <h3 className={`text-lg font-semibold text-white mb-2 transition-all duration-300 ${
                task.completed ? 'line-through opacity-60' : ''
              }`}>
                {task.title}
              </h3>
              {task.description && (
                <p className={`text-white/70 mb-3 transition-all duration-300 ${
                  task.completed ? 'line-through opacity-50' : ''
                }`}>
                  {task.description}
                </p>
              )}
              <div className="flex items-center gap-2 text-white/50 text-sm">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(task.createdAt)}</span>
              </div>
            </div>
          )}
        </div>

        {!isEditing && (
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              onClick={() => setIsEditing(true)}
              size="sm"
              variant="ghost"
              className="text-white/60 hover:text-neon-blue hover:bg-white/10 rounded-lg p-2"
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this task?')) {
                  onDeleteTask(task.id);
                }
              }}
              size="sm"
              variant="ghost"
              className="text-white/60 hover:text-red-400 hover:bg-white/10 rounded-lg p-2"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
