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

export type alertClass = "alert-danger" | "alert-success" | "alert-info" | "none";

export const translateToJapanese = (value: string): string => {
  switch (value) {
    case "work":
      return "仕事";
    case "home":
      return "家事";
    case "hobby":
      return "趣味";
    case "others":
      return "その他";
    case "high":
      return "高い";
    case "medium":
      return "中";
    case "low":
      return "低い";
    default:
      return value;
  }
};
