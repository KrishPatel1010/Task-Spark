
import React, { useState } from 'react';
import { Check, Edit, Trash2, Clock, Calendar, Flag, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Task, PriorityType } from '@/types/Task';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onEditTask: (id: string, title: string, description: string, dueDate: string, priority: PriorityType, category: string) => void;
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
  const [editDueDate, setEditDueDate] = useState(task.dueDate || '');
  const [editPriority, setEditPriority] = useState<PriorityType>(task.priority);
  const [editCategory, setEditCategory] = useState(task.category);

  const categories = ['Work', 'Personal', 'Health', 'Education', 'Finance', 'Other'];

  const handleSaveEdit = () => {
    if (editTitle.trim()) {
      onEditTask(task.id, editTitle.trim(), editDescription.trim(), editDueDate, editPriority, editCategory);
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditDueDate(task.dueDate || '');
    setEditPriority(task.priority);
    setEditCategory(task.category);
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getPriorityColor = (priority: PriorityType) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-400/20';
      case 'medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'low': return 'text-green-400 bg-green-400/20';
    }
  };

  const getPriorityIcon = (priority: PriorityType) => {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
    }
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <div className={`glass rounded-2xl p-6 transition-all duration-500 hover:shadow-lg hover:shadow-neon-blue/10 animate-slideInLeft group ${
      task.completed ? 'opacity-75' : ''
    } ${isOverdue ? 'border-red-400/50' : ''}`}>
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
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="date"
                  value={editDueDate}
                  onChange={(e) => setEditDueDate(e.target.value)}
                  className="bg-glass-white border-white/20 text-white rounded-lg"
                />
                <Select value={editPriority} onValueChange={(value: PriorityType) => setEditPriority(value)}>
                  <SelectTrigger className="bg-glass-white border-white/20 text-white rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-white/20">
                    <SelectItem value="low" className="text-green-400">🟢 Low</SelectItem>
                    <SelectItem value="medium" className="text-yellow-400">🟡 Medium</SelectItem>
                    <SelectItem value="high" className="text-red-400">🔴 High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Select value={editCategory} onValueChange={setEditCategory}>
                <SelectTrigger className="bg-glass-white border-white/20 text-white rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/20">
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat} className="text-white">
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
              <div className="flex items-center gap-2 mb-2">
                <h3 className={`text-lg font-semibold text-white transition-all duration-300 ${
                  task.completed ? 'line-through opacity-60' : ''
                }`}>
                  {task.title}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                  {getPriorityIcon(task.priority)} {task.priority.toUpperCase()}
                </span>
              </div>
              
              {task.description && (
                <p className={`text-white/70 mb-3 transition-all duration-300 ${
                  task.completed ? 'line-through opacity-50' : ''
                }`}>
                  {task.description}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-4 text-white/50 text-sm mb-2">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(task.createdAt)}</span>
                </div>
                
                {task.dueDate && (
                  <div className={`flex items-center gap-1 ${isOverdue ? 'text-red-400' : ''}`}>
                    <Clock className="w-4 h-4" />
                    <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                    {isOverdue && <span className="text-red-400 font-semibold">OVERDUE</span>}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-white/50 text-sm">
                  <Tag className="w-4 h-4" />
                  <span className="px-2 py-1 bg-white/10 rounded-full text-xs">
                    {task.category}
                  </span>
                </div>
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
