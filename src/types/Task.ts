
export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
  category: string;
}

export type FilterType = 'all' | 'completed' | 'pending';
export type PriorityType = 'low' | 'medium' | 'high';
