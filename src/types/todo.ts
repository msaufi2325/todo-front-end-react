export interface Todo {
  id: number;
  title: string;
  description: string;
  category: category;
  priority: priority;
  is_completed: boolean;
  is_removed: boolean;
  created_at: string;
  updated_at: string;
  user_id: number;
}

type category = "work" | "home" | "hobby" | "others";

type priority = "high" | "medium" | "low";
