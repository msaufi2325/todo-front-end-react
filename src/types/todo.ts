export interface Todo {
  id: number;
  title: string;
  description: string;
  category: keyof category;
  priority: keyof priority;
  isCompleted: boolean;
  isRemoved: boolean;
  createdAt: string;
  updatedAt: string;
}

interface priority {
  low: string;
  medium: string;
  high: string;
}

interface category {
  work: string;
  home: string;
  hobby: string;
}
