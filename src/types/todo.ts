export interface Todo {
  id: number;
  title: string;
  description: string;
  category: category;
  priority: priority;
  isCompleted: boolean;
  isRemoved: boolean;
  createdAt: string;
  updatedAt: string;
}

type category = "work" | "home" | "hobby";

type priority = "high" | "medium" | "low";
