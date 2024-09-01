export interface Todo {
  id: number;
  title: string;
  description: string;
  category: string;
  priority: keyof priority;
  isCheckedCompleted: boolean;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface priority {
  low: string;
  medium: string;
  high: string;
}
